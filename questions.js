const questions = [

  // ===== MATHEMATICS (SS3 / WAEC Level) =====
  {
    id: 1,
    subject: "Mathematics",
    topic: "Algebra",
    question: "Find the value of x if log₂(x + 3) + log₂(x - 3) = 4",
    options: ["x = 5", "x = 7", "x = 4", "x = 6"],
    answer: "x = 5",
    explanation_hint: "Combine the logs: log₂((x+3)(x-3)) = 4, so (x+3)(x-3) = 16. This gives x² - 9 = 16, x² = 25, x = 5."
  },
  {
    id: 2,
    subject: "Mathematics",
    topic: "Algebra",
    question: "If α and β are roots of 2x² - 5x + 3 = 0, find α² + β²",
    options: ["25/4", "13/4", "37/4", "7/4"],
    answer: "13/4",
    explanation_hint: "α+β = 5/2, αβ = 3/2. α²+β² = (α+β)² - 2αβ = 25/4 - 6/4 = 13/4."
  },
  {
    id: 3,
    subject: "Mathematics",
    topic: "Algebra",
    question: "Resolve (3x + 1)/((x - 1)(x + 2)) into partial fractions",
    options: ["4/(3(x-1)) - 1/(3(x+2))", "1/(x-1) + 2/(x+2)", "4/(3(x-1)) + 5/(3(x+2))", "2/(x-1) - 1/(x+2)"],
    answer: "4/(3(x-1)) + 5/(3(x+2))",
    explanation_hint: "Let (3x+1)/((x-1)(x+2)) = A/(x-1) + B/(x+2). Multiply through and substitute x=1 to get A=4/3, x=-2 to get B=5/3."
  },
  {
    id: 4,
    subject: "Mathematics",
    topic: "Trigonometry",
    question: "If sin θ = 3/5 and θ is acute, find the value of cos 2θ",
    options: ["7/25", "24/25", "-7/25", "1/25"],
    answer: "7/25",
    explanation_hint: "cos θ = 4/5 (Pythagoras). cos 2θ = 1 - 2sin²θ = 1 - 2(9/25) = 1 - 18/25 = 7/25."
  },
  {
    id: 5,
    subject: "Mathematics",
    topic: "Trigonometry",
    question: "Simplify: sin 2θ / (1 + cos 2θ)",
    options: ["cot θ", "tan θ", "sin θ", "cos θ"],
    answer: "tan θ",
    explanation_hint: "sin 2θ = 2sinθcosθ and 1 + cos 2θ = 2cos²θ. Dividing gives 2sinθcosθ/2cos²θ = sinθ/cosθ = tan θ."
  },
  {
    id: 6,
    subject: "Mathematics",
    topic: "Statistics",
    question: "The mean of 8 numbers is 6. If one number is removed, the mean becomes 7. What is the removed number?",
    options: ["-1", "1", "0", "-2"],
    answer: "-1",
    explanation_hint: "Sum of 8 numbers = 48. Sum of remaining 7 = 7×7 = 49. Removed number = 48 - 49 = -1."
  },
  {
    id: 7,
    subject: "Mathematics",
    topic: "Coordinate Geometry",
    question: "Find the equation of a circle with centre (3, -2) passing through (7, 1)",
    options: ["(x-3)²+(y+2)²=25", "(x+3)²+(y-2)²=25", "(x-3)²+(y+2)²=5", "(x-3)²+(y-2)²=25"],
    answer: "(x-3)²+(y+2)²=25",
    explanation_hint: "Radius² = (7-3)² + (1+2)² = 16 + 9 = 25. Centre is (3,-2) so equation is (x-3)²+(y+2)²=25."
  },
  {
    id: 8,
    subject: "Mathematics",
    topic: "Calculus",
    question: "If y = x³ - 4x² + 7x - 2, find dy/dx at x = 2",
    options: ["3", "5", "7", "9"],
    answer: "3",
    explanation_hint: "dy/dx = 3x² - 8x + 7. At x=2: 3(4) - 8(2) + 7 = 12 - 16 + 7 = 3."
  },
  {
    id: 9,
    subject: "Mathematics",
    topic: "Calculus",
    question: "Evaluate ∫(3x² + 2x - 5)dx",
    options: ["x³ + x² - 5x + C", "6x + 2 + C", "x³ + x² + C", "3x³ + x² - 5x + C"],
    answer: "x³ + x² - 5x + C",
    explanation_hint: "Integrate term by term: ∫3x²dx = x³, ∫2xdx = x², ∫-5dx = -5x. Add constant C."
  },
  {
    id: 10,
    subject: "Mathematics",
    topic: "Permutation & Combination",
    question: "In how many ways can 5 students be arranged in a row if 2 particular students must always be together?",
    options: ["24", "48", "72", "120"],
    answer: "48",
    explanation_hint: "Treat the 2 students as one unit — arrange 4 units in 4! = 24 ways. The 2 students can swap within their unit in 2! = 2 ways. Total = 24 × 2 = 48."
  },
  {
    id: 11,
    subject: "Mathematics",
    topic: "Number Theory",
    question: "Convert 0.142857142857... to a fraction in its lowest terms",
    options: ["1/6", "1/7", "2/13", "1/8"],
    answer: "1/7",
    explanation_hint: "0.142857 repeating = 142857/999999 = 1/7. You can verify: 1 ÷ 7 = 0.142857142857..."
  },
  {
    id: 12,
    subject: "Mathematics",
    topic: "Vectors",
    question: "If a = 3i + 4j and b = i - 3j, find |2a - b|",
    options: ["√74", "√50", "√90", "√146"],
    answer: "√146",
    explanation_hint: "2a = 6i + 8j. 2a - b = (6-1)i + (8+3)j = 5i + 11j. |2a - b| = √(5² + 11²) = √(25 + 121) = √146."
  },
  {
    id: 13,
    subject: "Mathematics",
    topic: "Probability",
    question: "A bag contains 5 red, 3 blue and 2 green balls. Two balls are drawn without replacement. Find the probability that both are red.",
    options: ["1/4", "2/9", "1/9", "1/5"],
    answer: "2/9",
    explanation_hint: "P(both red) = 5/10 × 4/9 = 20/90 = 2/9. The denominator decreases on the second draw because there is no replacement."
  },
  {
    id: 14,
    subject: "Mathematics",
    topic: "Matrices",
    question: "If A = [[2, 1], [3, 4]], find the determinant of A",
    options: ["5", "11", "8", "-5"],
    answer: "5",
    explanation_hint: "det(A) = (2×4) - (1×3) = 8 - 3 = 5."
  },
  {
    id: 15,
    subject: "Mathematics",
    topic: "Sequences & Series",
    question: "The 3rd and 7th terms of an AP are 10 and 26 respectively. Find the first term.",
    options: ["2", "4", "6", "8"],
    answer: "2",
    explanation_hint: "T₃ = a + 2d = 10 and T₇ = a + 6d = 26. Subtracting: 4d = 16, d = 4. Then a = 10 - 2(4) = 10 - 8 = 2. The first term is 2."
  },

  // ===== ENGLISH LANGUAGE (SS3 / WAEC Level) =====
  {
    id: 16,
    subject: "English Language",
    topic: "Lexis & Structure",
    question: "Choose the word closest in meaning to SYCOPHANT",
    options: ["Critic", "Flatterer", "Philosopher", "Antagonist"],
    answer: "Flatterer",
    explanation_hint: "A sycophant is someone who flatters important people to gain personal advantage. The closest synonym is flatterer or yes-man."
  },
  {
    id: 17,
    subject: "English Language",
    topic: "Lexis & Structure",
    question: "Select the option that best fills the gap: 'The committee ___ unable to reach a consensus after hours of deliberation'",
    options: ["was", "were", "are", "is"],
    answer: "was",
    explanation_hint: "'Committee' is a collective noun treated as singular in standard Nigerian/British English. Therefore 'was' is the correct verb form."
  },
  {
    id: 18,
    subject: "English Language",
    topic: "Oral English",
    question: "Which of the following words has its stress on the SECOND syllable when used as a VERB?",
    options: ["RECord", "PROtest", "IMport", "All of the above"],
    answer: "All of the above",
    explanation_hint: "In English, many nouns stress the first syllable (RECord, PROtest, IMport) while their verb forms stress the second syllable (reCORD, proTEST, imPORT). This is a key WAEC Oral English pattern."
  },
  {
    id: 19,
    subject: "English Language",
    topic: "Lexis & Structure",
    question: "Choose the grammatically correct sentence",
    options: [
      "Neither the students nor the teacher are ready",
      "Neither the students nor the teacher is ready",
      "Neither the students nor the teacher were ready",
      "Neither the students nor the teacher have been ready"
    ],
    answer: "Neither the students nor the teacher is ready",
    explanation_hint: "With 'neither...nor', the verb agrees with the nearest subject. The nearest subject is 'the teacher' (singular), so the correct verb is 'is'."
  },
  {
    id: 20,
    subject: "English Language",
    topic: "Comprehension",
    question: "The word EPHEMERAL most nearly means:",
    options: ["Eternal", "Short-lived", "Supernatural", "Extraordinary"],
    answer: "Short-lived",
    explanation_hint: "Ephemeral comes from Greek meaning 'lasting only a day'. It describes things that are transitory or short-lived — a key vocabulary word in WAEC comprehension passages."
  },
  {
    id: 21,
    subject: "English Language",
    topic: "Summary Writing",
    question: "Which of the following is NOT a feature of good summary writing?",
    options: [
      "Using your own words",
      "Including only main points",
      "Copying sentences directly from the passage",
      "Being concise and precise"
    ],
    answer: "Copying sentences directly from the passage",
    explanation_hint: "A good summary must be written in the candidate's own words. Lifting sentences directly from the passage is penalised in WAEC summary questions."
  },
  {
    id: 22,
    subject: "English Language",
    topic: "Lexis & Structure",
    question: "Select the option with the correct use of the apostrophe:",
    options: [
      "The boys' books were stolen",
      "The boy's' books were stolen",
      "The boys's books were stolen",
      "The boys books' were stolen"
    ],
    answer: "The boys' books were stolen",
    explanation_hint: "For plural nouns already ending in 's', add only an apostrophe after the s (boys'). This shows possession by multiple boys."
  },
  {
    id: 23,
    subject: "English Language",
    topic: "Lexis & Structure",
    question: "Choose the option nearest in meaning to the word VERBOSE",
    options: ["Clear", "Wordy", "Brilliant", "Confusing"],
    answer: "Wordy",
    explanation_hint: "Verbose means using more words than necessary. A verbose explanation is unnecessarily long and wordy — the opposite of concise."
  },
  {
    id: 24,
    subject: "English Language",
    topic: "Oral English",
    question: "In which of these words is a letter silent?",
    options: ["kite", "kind", "knife", "king"],
    answer: "knife",
    explanation_hint: "In 'knife', the letter 'k' is silent and not pronounced. Silent letters are a common feature tested in WAEC Oral English."
  },
  {
    id: 25,
    subject: "English Language",
    topic: "Comprehension",
    question: "Identify the figure of speech in: 'He is as brave as a lion'",
    options: ["Metaphor", "Hyperbole", "Simile", "Personification"],
    answer: "Simile",
    explanation_hint: "A simile makes a direct comparison using 'as' or 'like'. 'As brave as a lion' uses 'as' to compare the man's bravery to a lion's — making it a simile, not a metaphor."
  },
  {
    id: 26,
    subject: "English Language",
    topic: "Comprehension",
    question: "Which literary device is used in: 'The wind whispered secrets through the trees'?",
    options: ["Metaphor", "Personification", "Simile", "Hyperbole"],
    answer: "Personification",
    explanation_hint: "Personification gives human qualities to non-human things. The wind 'whispered' is a human action attributed to the wind — this is personification."
  },
  {
    id: 27,
    subject: "English Language",
    topic: "Lexis & Structure",
    question: "Which of the following sentences is in the passive voice?",
    options: [
      "The teacher marked the scripts",
      "The scripts were marked by the teacher",
      "The teacher is marking the scripts",
      "The teacher had marked the scripts"
    ],
    answer: "The scripts were marked by the teacher",
    explanation_hint: "In passive voice, the object of the action becomes the subject of the sentence. 'The scripts' (originally the object) becomes the subject, with 'were marked' as the passive verb."
  },
  {
    id: 28,
    subject: "English Language",
    topic: "Oral English",
    question: "Which of these words contains the vowel sound /ɪ/ as in 'bit'?",
    options: ["bean", "bin", "been", "bane"],
    answer: "bin",
    explanation_hint: "The short vowel sound /ɪ/ as in 'bit' appears in 'bin'. 'Bean' and 'been' contain the long /iː/ sound, and 'bane' contains the /eɪ/ diphthong."
  },
  {
    id: 29,
    subject: "English Language",
    topic: "Lexis & Structure",
    question: "Choose the correct form: 'By the time we arrived, the film ___'",
    options: ["already started", "has already started", "had already started", "already starts"],
    answer: "had already started",
    explanation_hint: "When two past events are mentioned, the earlier one uses the past perfect tense (had + past participle). The film starting happened before the arrival."
  },
  {
    id: 30,
    subject: "English Language",
    topic: "Vocabulary",
    question: "The word PHILANTHROPIST refers to someone who:",
    options: [
      "Studies philosophy",
      "Loves and helps mankind through charity",
      "Collects stamps and coins",
      "Studies plant life"
    ],
    answer: "Loves and helps mankind through charity",
    explanation_hint: "Philanthropist comes from Greek: 'philos' (loving) + 'anthropos' (mankind). A philanthropist donates time, money or resources to help others and improve society."
  },

  // ===== BIOLOGY (SS3 / WAEC Level) =====
  {
    id: 31,
    subject: "Biology",
    topic: "Genetics",
    question: "In a monohybrid cross between two heterozygous tall plants (Tt × Tt), what proportion of offspring will be homozygous dominant?",
    options: ["1/4", "1/2", "3/4", "1/3"],
    answer: "1/4",
    explanation_hint: "Tt × Tt produces TT : Tt : tt in ratio 1:2:1. Only TT is homozygous dominant = 1 out of 4 = 1/4."
  },
  {
    id: 32,
    subject: "Biology",
    topic: "Genetics",
    question: "A woman with blood group O marries a man with blood group AB. What blood groups are possible in their children?",
    options: ["O and AB only", "A and B only", "A, B, AB and O", "AB only"],
    answer: "A and B only",
    explanation_hint: "Group O is ii. Group AB is I^A I^B. Possible offspring: I^A i (group A) and I^B i (group B) only. Neither O nor AB can result from this cross."
  },
  {
    id: 33,
    subject: "Biology",
    topic: "Ecology",
    question: "Which of the following correctly describes the role of decomposers in an ecosystem?",
    options: [
      "They convert solar energy to chemical energy",
      "They break down dead organic matter releasing nutrients",
      "They transfer energy between trophic levels",
      "They fix atmospheric nitrogen into nitrates"
    ],
    answer: "They break down dead organic matter releasing nutrients",
    explanation_hint: "Decomposers (bacteria and fungi) break down dead organisms and waste, releasing minerals and nutrients back into the soil — completing the nutrient cycle."
  },
  {
    id: 34,
    subject: "Biology",
    topic: "Cell Biology",
    question: "Which organelle is responsible for producing ATP through aerobic respiration?",
    options: ["Ribosome", "Golgi apparatus", "Mitochondria", "Endoplasmic reticulum"],
    answer: "Mitochondria",
    explanation_hint: "Mitochondria are the powerhouse of the cell. They carry out aerobic respiration producing ATP through the Krebs cycle and electron transport chain."
  },
  {
    id: 35,
    subject: "Biology",
    topic: "Nutrition",
    question: "Which enzyme in the stomach begins the digestion of proteins?",
    options: ["Amylase", "Lipase", "Pepsin", "Trypsin"],
    answer: "Pepsin",
    explanation_hint: "Pepsin is secreted by the stomach wall and activated by hydrochloric acid. It breaks proteins into smaller peptides. Trypsin works in the small intestine, not the stomach."
  },
  {
    id: 36,
    subject: "Biology",
    topic: "Reproduction",
    question: "The process by which a diploid cell divides to produce four haploid cells is called:",
    options: ["Mitosis", "Binary fission", "Meiosis", "Budding"],
    answer: "Meiosis",
    explanation_hint: "Meiosis is a two-stage cell division that reduces the chromosome number by half, producing four genetically different haploid cells — used in the formation of gametes (sex cells)."
  },

  // ===== CHEMISTRY (SS3 / WAEC Level) =====
  {
    id: 37,
    subject: "Chemistry",
    topic: "Electrochemistry",
    question: "In electrolysis of dilute H₂SO₄, what is produced at the cathode?",
    options: ["Oxygen gas", "Sulphur dioxide", "Hydrogen gas", "Sulphuric acid"],
    answer: "Hydrogen gas",
    explanation_hint: "At the cathode (negative electrode), reduction occurs. H⁺ ions gain electrons: 2H⁺ + 2e⁻ → H₂. Therefore hydrogen gas is produced at the cathode."
  },
  {
    id: 38,
    subject: "Chemistry",
    topic: "Organic Chemistry",
    question: "Which of the following is the correct IUPAC name for CH₃-CH₂-CH(CH₃)-CH₂-CH₃?",
    options: ["2-methylbutane", "3-methylpentane", "2-ethylbutane", "3-methylbutane"],
    answer: "3-methylpentane",
    explanation_hint: "The longest carbon chain has 5 carbons (pentane). The methyl group is on carbon 3 when numbered to give the lowest locant. Name: 3-methylpentane."
  },
  {
    id: 39,
    subject: "Chemistry",
    topic: "Atomic Structure",
    question: "An element has atomic number 17 and mass number 35. How many neutrons does it have?",
    options: ["17", "18", "35", "52"],
    answer: "18",
    explanation_hint: "Number of neutrons = Mass number - Atomic number = 35 - 17 = 18. This element is Chlorine (Cl)."
  },
  {
    id: 40,
    subject: "Chemistry",
    topic: "Equilibrium",
    question: "According to Le Chatelier's principle, increasing pressure on a gaseous equilibrium will:",
    options: [
      "Always shift the reaction to the right",
      "Shift the reaction towards the side with fewer moles of gas",
      "Shift the reaction towards the side with more moles of gas",
      "Have no effect on the equilibrium"
    ],
    answer: "Shift the reaction towards the side with fewer moles of gas",
    explanation_hint: "Le Chatelier's principle states that a system responds to stress by minimising it. Increasing pressure favours the side with fewer moles of gas to reduce pressure."
  },
  {
    id: 41,
    subject: "Chemistry",
    topic: "Acids, Bases & Salts",
    question: "Which of the following salt solutions will give an alkaline pH when dissolved in water?",
    options: ["NH₄Cl", "NaCl", "Na₂CO₃", "FeCl₃"],
    answer: "Na₂CO₃",
    explanation_hint: "Na₂CO₃ (sodium carbonate) is a salt of a strong base (NaOH) and a weak acid (H₂CO₃). It undergoes hydrolysis to produce an alkaline solution. NH₄Cl and FeCl₃ give acidic solutions; NaCl is neutral."
  },

  // ===== PHYSICS (SS3 / WAEC Level) =====
  {
    id: 42,
    subject: "Physics",
    topic: "Waves",
    question: "A wave has frequency 500 Hz and wavelength 0.68 m. What is its speed?",
    options: ["340 m/s", "500 m/s", "0.68 m/s", "735 m/s"],
    answer: "340 m/s",
    explanation_hint: "Wave speed v = frequency × wavelength = 500 × 0.68 = 340 m/s. This is approximately the speed of sound in air at room temperature."
  },
  {
    id: 43,
    subject: "Physics",
    topic: "Electricity",
    question: "Three resistors of 6Ω, 3Ω and 2Ω are connected in parallel. What is the effective resistance?",
    options: ["11Ω", "1Ω", "0.5Ω", "2Ω"],
    answer: "1Ω",
    explanation_hint: "1/R = 1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 6/6 = 1. Therefore R = 1Ω."
  },
  {
    id: 44,
    subject: "Physics",
    topic: "Mechanics",
    question: "A body of mass 5kg is moving at 10 m/s. What is its kinetic energy?",
    options: ["25 J", "50 J", "250 J", "500 J"],
    answer: "250 J",
    explanation_hint: "KE = ½mv² = ½ × 5 × 10² = ½ × 5 × 100 = 250 J."
  },
  {
    id: 45,
    subject: "Physics",
    topic: "Optics",
    question: "A converging lens has a focal length of 20 cm. An object is placed 30 cm from the lens. What is the image distance?",
    options: ["12 cm", "60 cm", "15 cm", "20 cm"],
    answer: "60 cm",
    explanation_hint: "Using 1/f = 1/v - 1/u (real-is-positive): 1/20 = 1/v + 1/30. 1/v = 1/20 - 1/30 = 3/60 - 2/60 = 1/60. Therefore v = 60 cm."
  },
  {
    id: 46,
    subject: "Physics",
    topic: "Radioactivity",
    question: "A radioactive element has a half-life of 8 days. What fraction of the original sample remains after 32 days?",
    options: ["1/2", "1/4", "1/8", "1/16"],
    answer: "1/16",
    explanation_hint: "32 days ÷ 8 days = 4 half-lives. After each half-life the amount halves: (1/2)⁴ = 1/16 of the original remains."
  },

  // ===== ECONOMICS (SS3 / WAEC Level) =====
  {
    id: 47,
    subject: "Economics",
    topic: "Microeconomics",
    question: "If the price elasticity of demand for a good is -2.5, a 10% increase in price will lead to:",
    options: [
      "25% decrease in quantity demanded",
      "2.5% decrease in quantity demanded",
      "10% decrease in quantity demanded",
      "25% increase in quantity demanded"
    ],
    answer: "25% decrease in quantity demanded",
    explanation_hint: "PED = % change in QD / % change in price. -2.5 = QD% / 10%. QD% = -25%. Quantity demanded falls by 25%."
  },
  {
    id: 48,
    subject: "Economics",
    topic: "Macroeconomics",
    question: "Which of the following is NOT a function of the Central Bank of Nigeria?",
    options: [
      "Issuing currency",
      "Acting as lender of last resort",
      "Accepting deposits from the public",
      "Managing foreign exchange reserves"
    ],
    answer: "Accepting deposits from the public",
    explanation_hint: "The CBN is a banker's bank — it does not accept deposits from members of the public. That is the function of commercial banks. The CBN issues currency, manages reserves and acts as lender of last resort."
  },
  {
    id: 49,
    subject: "Economics",
    topic: "Microeconomics",
    question: "A firm is in equilibrium when:",
    options: [
      "Total revenue equals total cost",
      "Marginal cost equals marginal revenue",
      "Average cost is at its minimum",
      "Price equals average revenue"
    ],
    answer: "Marginal cost equals marginal revenue",
    explanation_hint: "A firm maximises profit — and is therefore in equilibrium — when Marginal Cost (MC) equals Marginal Revenue (MR). Producing beyond this point reduces profit."
  },
  {
    id: 50,
    subject: "Economics",
    topic: "Macroeconomics",
    question: "Which of the following will cause a leftward shift of the supply curve?",
    options: [
      "A decrease in the cost of production",
      "An improvement in technology",
      "An increase in the number of producers",
      "An increase in the cost of raw materials"
    ],
    answer: "An increase in the cost of raw materials",
    explanation_hint: "A leftward shift of supply means less is supplied at every price. Rising production costs (like raw materials) raise costs and reduce profitability, causing producers to supply less."
  },

  // ===== GOVERNMENT (SS3 / WAEC Level) =====
  {
    id: 51,
    subject: "Government",
    topic: "Nigerian Constitution",
    question: "Under the 1999 Constitution of Nigeria, which tier of government has exclusive jurisdiction over defence and foreign affairs?",
    options: ["State government", "Local government", "Federal government", "All tiers jointly"],
    answer: "Federal government",
    explanation_hint: "The Exclusive Legislative List in the 1999 Constitution reserves matters like defence, foreign affairs, immigration and currency solely for the Federal Government."
  },
  {
    id: 52,
    subject: "Government",
    topic: "International Organisations",
    question: "The Economic Community of West African States (ECOWAS) was established in which year?",
    options: ["1960", "1963", "1975", "1980"],
    answer: "1975",
    explanation_hint: "ECOWAS was established on 28 May 1975 by the Treaty of Lagos, signed by 15 West African nations to promote regional economic integration."
  },
  {
    id: 53,
    subject: "Government",
    topic: "Political Concepts",
    question: "Which of the following BEST describes federalism?",
    options: [
      "A system where all power is concentrated at the centre",
      "A system where power is shared between central and regional governments",
      "A system where the military controls governance",
      "A system where one party controls all levels of government"
    ],
    answer: "A system where power is shared between central and regional governments",
    explanation_hint: "Federalism is a system of government where powers are constitutionally divided between a central (federal) government and constituent units (states or regions), each sovereign in its own sphere."
  },
  {
    id: 54,
    subject: "Government",
    topic: "Nigerian History",
    question: "Nigeria attained independence from Britain on which date?",
    options: ["1st October 1960", "1st October 1963", "29th May 1999", "15th January 1966"],
    answer: "1st October 1960",
    explanation_hint: "Nigeria gained independence from British colonial rule on 1st October 1960. She became a republic on 1st October 1963. The 1st October date is celebrated annually as Nigeria's Independence Day."
  },

  // ===== GEOGRAPHY (SS3 / WAEC Level) =====
  {
    id: 55,
    subject: "Geography",
    topic: "Climate",
    question: "The Inter-Tropical Convergence Zone (ITCZ) is responsible for which type of rainfall in Nigeria?",
    options: ["Relief rainfall", "Frontal rainfall", "Convectional rainfall", "Cyclonic rainfall"],
    answer: "Convectional rainfall",
    explanation_hint: "The ITCZ is a low pressure belt where trade winds converge, causing warm moist air to rise, cool and condense — producing convectional rainfall. This drives Nigeria's wet season."
  },
  {
    id: 56,
    subject: "Geography",
    topic: "Population",
    question: "Which of these is a consequence of rural-urban migration in Nigerian cities?",
    options: [
      "Decreased pressure on urban infrastructure",
      "Growth of urban slums and unemployment",
      "Increased agricultural productivity",
      "Reduced population density in cities"
    ],
    answer: "Growth of urban slums and unemployment",
    explanation_hint: "Rural-urban migration increases urban population faster than available jobs and housing, leading to the growth of slums, overcrowding, unemployment and pressure on urban infrastructure."
  },
  {
    id: 57,
    subject: "Geography",
    topic: "Map Reading",
    question: "On a topographic map with a scale of 1:50,000, a distance of 4 cm represents what actual distance on the ground?",
    options: ["200 m", "500 m", "2 km", "20 km"],
    answer: "2 km",
    explanation_hint: "1 cm on map = 50,000 cm on ground = 500 m. Therefore 4 cm = 4 × 500 m = 2,000 m = 2 km."
  },
  {
    id: 58,
    subject: "Geography",
    topic: "Natural Resources",
    question: "Which of the following states in Nigeria is the largest producer of crude oil?",
    options: ["Lagos", "Delta", "Rivers", "Akwa Ibom"],
    answer: "Akwa Ibom",
    explanation_hint: "Akwa Ibom State is consistently Nigeria's largest crude oil producing state, accounting for over 30% of total national output, followed by Rivers and Delta states."
  },

  // ===== CIVIC EDUCATION (SS3 / WAEC Level) =====
  {
    id: 59,
    subject: "Civic Education",
    topic: "Human Rights",
    question: "Which chapter of the 1999 Nigerian Constitution contains the Fundamental Human Rights?",
    options: ["Chapter 1", "Chapter 2", "Chapter 4", "Chapter 6"],
    answer: "Chapter 4",
    explanation_hint: "Chapter 4 of the 1999 Constitution (Sections 33–46) contains the Fundamental Human Rights including right to life, dignity, fair hearing and freedom of expression."
  },
  {
    id: 60,
    subject: "Civic Education",
    topic: "Democracy",
    question: "Which of the following BEST describes the concept of separation of powers?",
    options: [
      "The president controls all arms of government",
      "Legislative, executive and judicial powers are held by different bodies",
      "Power is shared between federal and state governments",
      "Citizens share power with elected representatives"
    ],
    answer: "Legislative, executive and judicial powers are held by different bodies",
    explanation_hint: "Separation of powers means the three arms of government — legislature (law making), executive (implementation) and judiciary (interpretation) — are distinct and independent to prevent abuse of power."
  },
  {
    id: 61,
    subject: "Civic Education",
    topic: "Citizenship",
    question: "Which of the following is a civic OBLIGATION of every Nigerian citizen?",
    options: [
      "Contesting for political office",
      "Paying taxes and obeying the law",
      "Joining a political party",
      "Working for the government"
    ],
    answer: "Paying taxes and obeying the law",
    explanation_hint: "Civic obligations are duties citizens are legally required to perform. Paying taxes and obeying the law are compulsory obligations. Contesting elections and party membership are rights, not obligations."
  },

  // ===== LITERATURE IN ENGLISH (SS3 / WAEC Level) =====
  {
    id: 62,
    subject: "Literature in English",
    topic: "Drama",
    question: "In Wole Soyinka's 'The Lion and the Jewel', who does Sidi ultimately choose to marry?",
    options: ["Lakunle", "Baroka", "The stranger", "No one"],
    answer: "Baroka",
    explanation_hint: "Despite Lakunle's modern wooing, Sidi chooses Baroka the Bale after he tricks her into sleeping with him, proving his virility. The play contrasts tradition and modernity in Yoruba society."
  },
  {
    id: 63,
    subject: "Literature in English",
    topic: "Poetry",
    question: "The repetition of the same consonant sound at the beginning of closely connected words is called:",
    options: ["Assonance", "Alliteration", "Onomatopoeia", "Rhyme"],
    answer: "Alliteration",
    explanation_hint: "Alliteration is the repetition of initial consonant sounds in nearby words, e.g. 'Peter Piper picked a peck'. Assonance is repetition of vowel sounds; onomatopoeia is words that sound like what they describe."
  },
  {
    id: 64,
    subject: "Literature in English",
    topic: "Prose",
    question: "Chinua Achebe's 'Things Fall Apart' is set primarily in which fictional Igbo village?",
    options: ["Abame", "Mbanta", "Umuofia", "Nnewi"],
    answer: "Umuofia",
    explanation_hint: "The novel is primarily set in Umuofia, the fictional Igbo clan where Okonkwo lives and rises to prominence. He is later exiled to Mbanta (his mother's village) for seven years."
  }
];