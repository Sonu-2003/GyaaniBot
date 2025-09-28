# rag_bot.py

from langchain_community.document_loaders import PyPDFLoader
from langchain_experimental.text_splitter import SemanticChunker
from langchain.embeddings import HuggingFaceEmbeddings
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from langchain_pinecone import PineconeVectorStore
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import pinecone
import os

load_dotenv()
API_KEY = os.getenv('OPENROUTER_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_ENVIRONMENT = os.getenv('PINECONE_ENVIRONMENT')

# Initialize Pinecone
pc = pinecone.Pinecone(api_key=PINECONE_API_KEY)
index_name = "chatbotproject"

# Function to initialize the RAG pipeline
def init_rag_pipeline():
    # Load PDFs and process
    file_path = "data/Institutional_information.pdf"  # replace with your PDFs
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    text_splitter = SemanticChunker(embeddings)
    docs = text_splitter.split_documents(documents)

    vectorstore = PineconeVectorStore.from_documents(
        documents=docs,
        embedding=embeddings,
        index_name=index_name
    )

    chat_model = ChatOpenAI(
        model="openai/gpt-3.5-turbo",
        api_key=API_KEY,
        base_url="https://openrouter.ai/api/v1"
    )

    prompt = PromptTemplate(
        template="""
        You are a helpful assistant.
        Answer ONLY from the provided context.
        If the context is insufficient, just say don't know.
        {context}
        Question: {question}
        """,
        input_variables=["context", "question"]
    )

    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})

    def format_docs(retrieved_docs):
        return "\n\n".join(doc.page_content for doc in retrieved_docs)

    parallel_chain = RunnableParallel({
        'context': retriever | RunnableLambda(format_docs),
        'question': RunnablePassthrough()
    })

    parser = StrOutputParser()
    main_chain = parallel_chain | prompt | chat_model | parser

    return main_chain

# Initialize pipeline globally
rag_pipeline = init_rag_pipeline()

# Function to call from backend
def get_rag_response(question: str):
    return rag_pipeline.invoke(question)
