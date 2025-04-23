import streamlit as st
import asyncio
from phi.agent import Agent
from phi.model.groq import Groq
from phi.tools.yfinance import YFinanceTools
from phi.tools.duckduckgo import DuckDuckGo

st.set_page_config(page_title="📈 AI Stock Analyzer", layout="centered")

# Cache the agents to avoid re-initializing them each time
@st.cache_resource
def load_multi_agent():
    web_search_agent = Agent(
        name='Web Search Agent',
        role='Search the web for information',
        model=Groq(id="llama-3.3-70b-versatile"),
        tools=[DuckDuckGo()],
        instructions=['Always include sources'],
        show_tools_calls=True,
        markdown=True,
    )

    finance_agent = Agent(
        name='Finance Agent',
        model=Groq(id="llama-3.3-70b-versatile"),
        tools=[YFinanceTools(
            stock_price=True,
            analyst_recommendations=True,
            stock_fundamentals=True,
            company_news=True,
        )],
        instructions=['Use tables to display the data'],
        show_tool_calls=True,
        markdown=True,
    )

    recommendation_agent = Agent(
        name="Recommendation Agent",
        role="Recommends stocks based on risk and return profiles",
        model=Groq(id="llama-3.3-70b-versatile"),
        tools=[YFinanceTools(
            stock_price=True,
            stock_fundamentals=True,
            analyst_recommendations=True,
        )],
        instructions=[
            "Analyze and rank publicly traded stocks.",
            "Return two tables: one with top 5 riskiest stocks (high return, high risk), and one with top 5 safest stocks (low/no loss, steady return).",
            "Risk can be inferred using price volatility, beta, analyst recommendations, and fundamentals.",
            "Use markdown tables for display."
        ],
        show_tool_calls=True,
        markdown=True,
    )

    multi_ai_agent = Agent(
        team=[web_search_agent, finance_agent, recommendation_agent],
        model=Groq(id="llama-3.3-70b-versatile"),
        instructions=[
            "Use the web search agent to find information about the company.",
            "Use the finance agent to analyze stock fundamentals, recommendations, and news.",
            "Use the recommendation agent to suggest top 5 risky and top 5 safe stocks.",
            "Always use tables to display results."
        ],
        show_tools_calls=True,
        markdown=True,
    )

    return multi_ai_agent


# Load agent once
multi_ai_agent = load_multi_agent()

# --- Streamlit UI ---
st.title("📊 AI Stock Analyzer")
st.markdown("Ask anything about a stock or company. Example queries:")
st.markdown("- `Summarize analyst recommendation and news for NVDA`")
st.markdown("- `Predict stock trends for AAPL and TSLA`")

# User input
user_query = st.text_input("🔍 Your Query:", placeholder="Type your question here...")

if st.button("Submit") and user_query:
    with st.spinner("Analyzing with multi-agent AI..."):
        try:
            response = multi_ai_agent.run(user_query, stream=False)
            st.markdown(response.content)
        except Exception as e:
            st.error(f"❌ Error: {str(e)}")

