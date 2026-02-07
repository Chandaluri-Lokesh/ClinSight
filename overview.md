1️⃣ What problem is this project solving?

In medical diagnosis, AI systems today suffer from two big reliability issues:

❌ Existing approaches

Text-only RAG systems

Retrieve only text (PubMed papers, notes)

❌ Ignore X-rays, scans, lab values

Multi-modal LLMs (images + text)

Can “see” images and read notes

❌ Hallucinate because they are not grounded in verified medical sources

❌ Often give answers without citations

In medicine, hallucinations = dangerous, because decisions affect patient safety.

📌 This core problem is clearly stated in the abstract and proposal 

4-1 Major Project Form

 

Abstract

2️⃣ Big idea of the project (one-line)

Build a trustworthy medical diagnosis support system that combines multi-modal data (images + text + labs) with verified medical knowledge and reasoning, and generates citation-backed outputs.

This is why it’s called:

Hybrid Multi-Modal Retrieval-Augmented Generation (RAG)

Hybrid → Vector DB + Knowledge Graph

Multi-Modal → Images, clinical notes, lab values

RAG → Retrieve evidence before generating answers

3️⃣ What data does the system take as input?

The system works like a digital clinical assistant.

Inputs (from Dataset Description & Architecture)

🩻 Radiology images (X-ray / CT)

📝 Clinical notes (doctor observations, symptoms)

🧪 Lab results (WBC, CRP, Platelets, etc.)

❓ Clinician query (e.g., “What is the likely diagnosis?”)

📄 Explained in detail in dataset & preprocessing sections 

Major Project Review - 1

4️⃣ Core architecture — how the system works (step-by-step)

Think of the system as 6 connected layers.

🔹 1. Input Module

Collects and validates:

Images

Text

Lab values

No intelligence here — just clean ingestion.

🔹 2. Embedding Module

Different data → different encoders:

Data Type	Model Used
Clinical text	BioBERT / PubMedBERT
Medical images	CLIP / BioViL
Lab values	Numerical feature vectors

All inputs are converted into dense embeddings.

📌 This is shown in the system architecture pages 

Major Project Review - 0

🔹 3. Hybrid Retrieval Module (MOST IMPORTANT)

This is where your project becomes unique.

a) Vector Database (FAISS)

Retrieves similar past cases

Works on semantic similarity

Example:

“Find chest X-rays similar to this one”

b) Knowledge Graph (Neo4j + SNOMED / UMLS)

Stores structured medical facts

Disease–symptom–lab–treatment relationships

Example:

Fever + cough + high WBC → Pneumonia

📌 This hybrid idea is the main research contribution 

4-1 Major Project Form

🔹 4. Reasoning Module (brain of the system)

This module:

Cross-checks evidence across modalities

Filters contradictions

Aligns:

Image findings

Lab abnormalities

Clinical symptoms

Example reasoning:

X-ray opacity + elevated WBC + fever
→ consistent with pneumonia
→ not random hallucination

📌 Clearly explained in methodology & reasoning sections 

Abstract

🔹 5. Generation Module (LLM)

A multi-modal LLM (LLaVA-Med / BioGPT):

Receives validated evidence

Generates:

Diagnostic summary

Supporting explanation

Explicit citations

Example output:

“Findings suggest pneumonia, supported by:

MIMIC-CXR case #XYZ

PubMed PMID:123456

SNOMED CT:233604007”

📌 This solves hallucination and trust issues 

4-1 Major Project Form

🔹 6. Evaluation Module

The system is benchmarked scientifically, not just demoed.

Compared against:

Text-only RAG

Multi-modal LLM without retrieval

Your proposed hybrid system

Metrics:

Factual accuracy

Hallucination rate

Citation coverage

Cross-modal reasoning score

BLEU / ROUGE

📌 Covered in evaluation strategy 

Major Project Review - 0

5️⃣ Why this project is strong (academically & practically)
✅ Key contributions

First end-to-end hybrid multi-modal RAG for medical diagnosis

Combines:

Vector search

Knowledge graphs

Reasoning

Multi-modal generation

Produces explainable, citation-backed outputs

✅ Why guides/examiners like it

Clear research gap

Strong literature grounding

Proper evaluation

Ethical & safety focus

📌 Mapped to POs, PEOs, and SDGs (especially SDG-3: Good Health) 

PO_PEO_SDG Documentation

6️⃣ What this project is NOT

(important for viva)

❌ Not an autonomous diagnosis system
❌ Not replacing doctors
✅ It is a decision-support tool

7️⃣ One-paragraph viva-ready explanation

This project proposes a Hybrid Multi-Modal Retrieval-Augmented Generation framework for factual medical diagnosis support. The system processes radiology images, clinical notes, and lab values using modality-specific encoders. It performs hybrid retrieval using a vector database for unstructured similarity search and a medical knowledge graph for structured grounding. A reasoning module cross-validates evidence across modalities to reduce hallucinations. Finally, a multi-modal LLM generates citation-backed diagnostic summaries. The system is benchmarked against text-only RAG and multi-modal LLM baselines, demonstrating improved factual accuracy, reasoning alignment, and trustworthiness.