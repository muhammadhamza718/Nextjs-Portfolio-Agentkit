"""Portfolio AI Twin - ChatKit Server Implementation.
Provides the official protocol handshake for the AI Twin.
"""

from __future__ import annotations
from typing import Any, AsyncIterator
import json
import logging

from chatkit.server import ChatKitServer
from chatkit.agents import AgentContext, simple_to_agent_input, stream_agent_response
from memory_store import MemoryStore
from chatkit.types import ThreadMetadata, ThreadStreamEvent, UserMessageItem
from agents import Runner

# Import your agent creation logic
from agent import create_portfolio_agent

logger = logging.getLogger(__name__)

class PortfolioChatServer(ChatKitServer[dict[str, Any]]):
    """Server implementation that tracks AI Twin sessions."""

    def __init__(self) -> None:
        # Use simple in-memory store for local dev
        self.store = MemoryStore()
        super().__init__(self.store)

    async def respond(
        self,
        thread: ThreadMetadata,
        item: UserMessageItem | None,
        context: dict[str, Any],
    ) -> AsyncIterator[ThreadStreamEvent]:
        """Handle incoming messages and stream the Gemini response."""
        
        # 1. Fetch conversation history
        items_page = await self.store.load_thread_items(
            thread.id,
            after=None,
            limit=20,
            order="desc",
            context=context
        )
        items = list(reversed(items_page.data))
        
        # 2. Convert to format the Agent understands
        if item:
            logger.info(f"Incoming message from user: {item.text if hasattr(item, 'text') else 'No text'}")
        
        agent_input = await simple_to_agent_input(items)
        logger.info(f"Last 2 items in history: {items[-2:] if len(items) >= 2 else items}")
        logger.debug(f"Converted agent input: {agent_input}")

        # 3. Create the Portfolio Agent (personality from metadata if exists)
        personality = thread.metadata.get("personality", "clear")
        agent = create_portfolio_agent(personality=personality)

        # 4. Prepare Context
        agent_context = AgentContext(
            thread=thread,
            store=self.store,
            request_context=context,
        )

        # 5. Run the Agent (using LiteLLM + Gemini)
        logger.info(f"Streaming response for thread {thread.id} [Personality: {personality}]")
        logger.debug(f"Starting Runner.run_streamed with input: {agent_input}")
        
        # Use Runner.run_streamed which is the engine for the Agent SDK
        result = Runner.run_streamed(
            agent,
            agent_input,
            context=agent_context,
        )

        # 6. Stream back to ChatKit UI in the correct protocol format
        try:
            async for event in stream_agent_response(agent_context, result):
                logger.debug(f"Yielding event: {event.type}")
                # Log any assistant message text for debugging silence
                if event.type == "thread.item.updated" and hasattr(event, 'update'):
                    update = event.update
                    if hasattr(update, 'delta') and isinstance(update.delta, str):
                        logger.debug(f"Message delta: '{update.delta}'")
                yield event
        except Exception as e:
            logger.exception(f"Error during stream_agent_response: {str(e)}")
            # Don't re-raise, maybe we yielded something useful
