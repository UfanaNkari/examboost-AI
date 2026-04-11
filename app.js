// ===================================================
// ExamBoost AI — app.js
// ===================================================

const CLAUDE_API_KEY = "YOUR_API_KEY_HERE"; // ← replace with your key
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const QUESTIONS_PER_SESSION = 10;
const QUESTION_TIME_SECONDS = 90; // countdown per question

// ===== STUDY TIPS DATABASE =====
// Provides rich, topic-specific recommendations in the summary
const studyTips = {
  "Algebra": {
    tips: [
      "Practice factorisation and expansion of brackets daily — these appear in almost every WAEC Maths paper.",
      "Always check your answers by substituting back into the original equation.",
      "Memorise the quadratic formula: x = (-b ± √(b²-4ac)) / 2a and know when to use it."
    ],
    resources: ["WAEC Past Questions (2015–2023)", "New General Mathematics SS3", "Khan Academy Algebra"],
    encouragement: "Algebra is the backbone of Mathematics. Once you master it, harder topics like Calculus and Vectors become much easier. You're on the right track — keep practising!"
  },
  "Trigonometry": {
    tips: [
      "Memorise the SOHCAHTOA rule and the unit circle values for 0°, 30°, 45°, 60°, 90°.",
      "Learn the double angle formulas: sin 2θ = 2sinθcosθ and cos 2θ = 1 - 2sin²θ.",
      "Draw diagrams for every trigonometry problem — visualising the triangle helps enormously."
    ],
    resources: ["New General Mathematics SS3 (Chapter 9)", "WAEC Past Questions", "YouTube: ExamSolutions Trig"],
    encouragement: "Trigonometry looks scary but becomes predictable once you know the key identities. WAEC repeats the same types of questions — past papers are your best friend here!"
  },
  "Calculus": {
    tips: [
      "Differentiation: learn the power rule, product rule, quotient rule and chain rule in that order.",
      "Integration: remember that integration is the reverse of differentiation. Always add the constant C.",
      "Practice finding turning points by setting dy/dx = 0 — this is a guaranteed WAEC question type."
    ],
    resources: ["New General Mathematics SS3 (Chapter 14–15)", "WAEC Past Questions (Calculus)", "Mathway online calculator for checking"],
    encouragement: "Calculus typically carries 10–15 marks in WAEC. Mastering just differentiation and basic integration will significantly boost your overall score. Focus here!"
  },
  "Statistics": {
    tips: [
      "Know the difference between mean, median and mode — and when each is appropriate to use.",
      "Practice cumulative frequency tables and how to draw ogives — these appear frequently.",
      "Standard deviation questions appear in WAEC. Practise the formula with small datasets first."
    ],
    resources: ["New General Mathematics SS3 (Chapter 16)", "WAEC Past Questions (Statistics)", "Statistics textbook by Usman"],
    encouragement: "Statistics questions often give away easy marks if you know the formulas. The mean and probability topics alone can earn you 10+ marks in the exam!"
  },
  "Probability": {
    tips: [
      "Always list the sample space first before calculating any probability.",
      "Know the difference between mutually exclusive and independent events.",
      "For 'without replacement' problems, remember the total reduces after each draw."
    ],
    resources: ["New General Mathematics SS3", "WAEC Past Questions (2018–2023)", "BBC Bitesize Probability"],
    encouragement: "Probability questions are very common in WAEC and follow predictable patterns. A few hours of focused practice can turn this into a strong area for you!"
  },
  "Coordinate Geometry": {
    tips: [
      "Memorise the distance formula, midpoint formula, and equation of a straight line (y = mx + c).",
      "For circles, always identify the centre and radius before attempting any calculation.",
      "Practice finding the gradient of a line and the condition for perpendicular lines (m₁ × m₂ = -1)."
    ],
    resources: ["New General Mathematics SS3 (Chapter 8)", "WAEC Past Questions", "GeoGebra online (for visualising)"],
    encouragement: "Coordinate Geometry bridges Algebra and Geometry. The formulas are straightforward — the challenge is knowing which one to apply. Past questions will show you the patterns."
  },
  "Vectors": {
    tips: [
      "Always distinguish between a vector (magnitude + direction) and a scalar (magnitude only).",
      "Practice adding and subtracting vectors both graphically and algebraically.",
      "For dot products: a·b = |a||b|cosθ. Use this to find angles between vectors."
    ],
    resources: ["New General Mathematics SS3 (Chapter 12)", "WAEC Past Questions", "YouTube: Vectors for WAEC"],
    encouragement: "Vectors is a high-yield topic in WAEC. The concepts are logical and formulaic — with consistent practice, you can master it within a week!"
  },
  "Matrices": {
    tips: [
      "Practise finding the determinant of 2×2 and 3×3 matrices until it becomes automatic.",
      "Know how to find the inverse of a 2×2 matrix: swap the diagonals, negate off-diagonals, divide by determinant.",
      "Matrix multiplication is only defined when the columns of A equal the rows of B — always check this first."
    ],
    resources: ["New General Mathematics SS3", "WAEC Past Questions (Matrices)", "Online Matrix Calculator for practice"],
    encouragement: "Matrices questions follow very set patterns in WAEC. A student who practises 20 past questions on matrices is almost guaranteed to score full marks in that section!"
  },
  "Sequences & Series": {
    tips: [
      "For AP: Tₙ = a + (n-1)d and Sₙ = n/2(2a + (n-1)d). These must be memorised perfectly.",
      "For GP: Tₙ = arⁿ⁻¹ and Sₙ = a(rⁿ-1)/(r-1). Know when to use the sum to infinity formula.",
      "Always identify whether a sequence is AP or GP before choosing a formula."
    ],
    resources: ["New General Mathematics SS3 (Chapter 3)", "WAEC Past Questions (Sequences)", "Further Mathematics textbook"],
    encouragement: "AP and GP questions are almost always in Section B of WAEC Maths. These are very learnable — a few hours of practice with the formulas will get you there!"
  },
  "Permutation & Combination": {
    tips: [
      "Remember: Permutation = order matters (nPr), Combination = order doesn't matter (nCr).",
      "For arrangements with repeated items, divide by the factorial of each repeated group.",
      "Practice problems involving circular arrangements — these appear in WAEC."
    ],
    resources: ["New General Mathematics SS3", "WAEC Past Questions (Permutation)", "Statistics and Probability textbook"],
    encouragement: "Permutation and Combination questions are completely solvable if you know which formula to apply. The key is identifying 'with' or 'without' replacement, and whether order matters."
  },
  "Number Theory": {
    tips: [
      "Practice converting between fractions, decimals and percentages until it's automatic.",
      "For recurring decimals: multiply by 10ⁿ where n is the number of recurring digits, then subtract.",
      "Know the divisibility rules for 2, 3, 4, 5, 6, 9, and 10."
    ],
    resources: ["New General Mathematics SS1–SS3", "WAEC Past Questions", "Mathematics Counts textbook"],
    encouragement: "Number Theory covers foundational skills that come up across many WAEC topics. Strengthening this area will benefit your performance in Algebra and Statistics too!"
  },
  "Geometry": {
    tips: [
      "Know all angle theorems: angles on a straight line (180°), in a triangle (180°), on a point (360°).",
      "Circle theorems are frequently tested — memorise at least 6 of the standard theorems.",
      "Always draw and label a clear diagram before solving any geometry problem."
    ],
    resources: ["New General Mathematics SS2–SS3", "WAEC Past Questions (Geometry)", "BBC Bitesize Circle Theorems"],
    encouragement: "Geometry rewards visual thinkers. Take your time to draw neat, labelled diagrams and you'll find the solutions become much clearer. Practice makes this topic intuitive!"
  },

  // English Language topics
  "Lexis & Structure": {
    tips: [
      "Read WAEC past questions on Lexis & Structure daily — the question types repeat across years.",
      "Focus on subject-verb agreement rules, especially with collective nouns, neither/nor and either/or.",
      "Build your vocabulary by learning 5 new words daily with their synonyms and antonyms."
    ],
    resources: ["Countdown to WAEC English (Macmillan)", "WAEC Past Questions (2010–2023)", "Oxford Advanced Learner's Dictionary"],
    encouragement: "Lexis & Structure typically carries the most marks in WAEC English. Regular reading of good books and newspapers will naturally improve this area over time. Keep at it!"
  },
  "Comprehension": {
    tips: [
      "Always read the questions FIRST before reading the passage — this helps you read purposefully.",
      "Answer in complete sentences and use evidence from the passage to support every answer.",
      "Watch out for vocabulary-in-context questions — the meaning of a word can change in different passages."
    ],
    resources: ["Countdown to WAEC English", "WAEC Past Questions (Comprehension)", "Reading novels like Chinua Achebe's works"],
    encouragement: "Comprehension is a skill that improves steadily with reading practice. Even 20 minutes of reading daily — novels, newspapers, textbooks — will sharpen your ability to understand and answer passages."
  },
  "Oral English": {
    tips: [
      "Learn the 44 phonemes of English and practice identifying vowel and consonant sounds.",
      "Study the stress patterns for nouns vs verbs (e.g. RECord vs reCORD).",
      "Use a dictionary with phonetic transcription (like Oxford) to check pronunciation of unfamiliar words."
    ],
    resources: ["Oral English for Schools & Colleges (Revised Ed.)", "WAEC Past Questions (Oral English)", "YouTube: British Council Phonics"],
    encouragement: "Oral English seems difficult because it's abstract, but WAEC tests the same sounds and stress patterns every year. Past questions are the most efficient way to master this section!"
  },
  "Summary Writing": {
    tips: [
      "Use ONLY your own words — never copy directly from the passage. WAEC markers deduct marks for this.",
      "Count your words carefully. Going over the word limit costs you marks even if your content is correct.",
      "Write your summary points in numbered sentences — this makes it easy to count and organise."
    ],
    resources: ["Countdown to WAEC English (Summary chapter)", "WAEC Chief Examiner's Reports", "WAEC Past Questions (Summary)"],
    encouragement: "Summary Writing is very mark-friendly once you know the rules. The two golden rules — use your own words and stick to the word limit — alone can earn you high marks consistently!"
  },
  "Vocabulary": {
    tips: [
      "Learn words in families: noun, verb, adjective, adverb forms of the same root word.",
      "Pay special attention to commonly confused words: affect/effect, principal/principle, complement/compliment.",
      "Use new vocabulary words in sentences immediately after learning them to reinforce memory."
    ],
    resources: ["Word Power Made Easy (Norman Lewis)", "Oxford Word Skills", "WAEC Past Questions (Vocabulary)"],
    encouragement: "A strong vocabulary improves every section of your English paper — Comprehension, Summary and Lexis & Structure. Investing time in vocabulary pays dividends across the whole exam!"
  },

  // Science topics
  "Genetics": {
    tips: [
      "Draw Punnett squares for every genetics cross — never try to do it in your head.",
      "Know the difference between genotype (genetic makeup) and phenotype (physical appearance).",
      "Memorise blood group genetics: I^A and I^B are codominant; i is recessive."
    ],
    resources: ["WAEC Biology Textbook (Genetics chapter)", "WAEC Past Questions (Biology)", "YouTube: Amoeba Sisters Genetics"],
    encouragement: "Genetics questions follow very predictable patterns in WAEC. Once you master Punnett squares and the basic inheritance rules, you can solve virtually any genetics question that appears!"
  },
  "Ecology": {
    tips: [
      "Know the difference between a food chain and a food web, and how energy flows between trophic levels.",
      "Study the nitrogen cycle, carbon cycle and water cycle — these are guaranteed WAEC topics.",
      "Memorise ecological terms: producers, consumers, decomposers, herbivores, carnivores, omnivores."
    ],
    resources: ["WAEC Biology Textbook (Ecology chapters)", "WAEC Past Questions (Ecology)", "Practical Ecology field notes"],
    encouragement: "Ecology covers real-world concepts that are logical and interconnected. Understanding one concept (like energy flow) makes related concepts much easier to grasp. Build your knowledge systematically!"
  },
  "Cell Biology": {
    tips: [
      "Draw and label a plant cell and an animal cell from memory — this is a very common WAEC question.",
      "Know the function of each organelle: mitochondria (energy/ATP), ribosome (protein synthesis), etc.",
      "Understand the difference between mitosis and meiosis — number of divisions, products, and purpose."
    ],
    resources: ["WAEC Biology Textbook (Cell Biology)", "WAEC Past Questions", "YouTube: Crash Course Biology"],
    encouragement: "Cell Biology forms the foundation of all Biology. Strong knowledge here makes topics like Genetics, Nutrition and Reproduction much easier. Your investment here pays off across the whole subject!"
  },
  "Nutrition": {
    tips: [
      "Know the digestive enzymes: where they act, what they break down, and what they produce.",
      "Learn the food classes: carbohydrates, proteins, fats, vitamins, minerals, water and their functions.",
      "Understand deficiency diseases: kwashiorkor (protein), scurvy (vitamin C), rickets (vitamin D), anaemia (iron)."
    ],
    resources: ["WAEC Biology Textbook (Nutrition)", "WAEC Past Questions", "NHS Nutrition resources online"],
    encouragement: "Nutrition is one of the most mark-rich and learnable topics in WAEC Biology. The facts are clear-cut and memorisable — a few focused revision sessions can make this a guaranteed scoring area!"
  },
  "Reproduction": {
    tips: [
      "Know the differences between sexual and asexual reproduction with examples.",
      "Understand the human menstrual cycle — its stages, hormones involved and duration.",
      "Know pollination types in plants: self-pollination vs cross-pollination, and their agents (wind, insects, water)."
    ],
    resources: ["WAEC Biology Textbook (Reproduction)", "WAEC Past Questions (Reproduction)", "YouTube: Biology with Dr. Binocs"],
    encouragement: "Reproduction is tested in every WAEC Biology paper. The topic is logical and follows clear biological principles. Consistent revision with past questions will make this a strong area for you!"
  },

  // Chemistry topics
  "Electrochemistry": {
    tips: [
      "Remember: OIL RIG — Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons).",
      "Cathode = reduction (positive ions gain electrons). Anode = oxidation (negative ions lose electrons).",
      "Know the electrochemical series — it determines which ions are discharged preferentially."
    ],
    resources: ["New School Chemistry (Osei Yaw Ababio)", "WAEC Past Questions (Chemistry)", "YouTube: Chemistry with Kemi"],
    encouragement: "Electrochemistry is one of the most tested Chemistry topics in WAEC. The rules are consistent — once you understand cathode vs anode and oxidation vs reduction, the questions become very manageable!"
  },
  "Organic Chemistry": {
    tips: [
      "Memorise the first 10 alkanes: methane, ethane, propane, butane, pentane, hexane, heptane, octane, nonane, decane.",
      "Know the functional groups: alcohol (-OH), carboxylic acid (-COOH), ester (-COO-), amine (-NH₂).",
      "Practice IUPAC naming rules systematically — find the longest chain, number from the nearest branch."
    ],
    resources: ["New School Chemistry (Ababio) — Organic chapters", "WAEC Past Questions (Organic Chemistry)", "YouTube: Organic Chemistry Basics"],
    encouragement: "Organic Chemistry can feel overwhelming, but WAEC tests the same families of reactions repeatedly. Mastering alkanes, alkenes, alkynes and their reactions will cover most of what you need!"
  },
  "Atomic Structure": {
    tips: [
      "Know the subatomic particles: proton (positive, in nucleus), neutron (neutral, in nucleus), electron (negative, orbit).",
      "Atomic number = number of protons = number of electrons in a neutral atom.",
      "Mass number = protons + neutrons. Isotopes have the same atomic number but different mass numbers."
    ],
    resources: ["New School Chemistry (Ababio)", "WAEC Past Questions (Atomic Structure)", "GCSE Chemistry revision notes"],
    encouragement: "Atomic Structure is foundational — understanding it deeply makes topics like Electrochemistry, Periodic Table and Chemical Bonding much clearer. Invest time here and the benefits compound across the subject!"
  },
  "Equilibrium": {
    tips: [
      "Le Chatelier's Principle: the system always opposes the change applied to it.",
      "Increasing temperature always favours the endothermic direction (absorbs heat to oppose the increase).",
      "A catalyst speeds up both forward and reverse reactions equally — it does NOT shift equilibrium position."
    ],
    resources: ["New School Chemistry (Ababio) — Equilibrium chapter", "WAEC Past Questions", "YouTube: Le Chatelier's Principle explained"],
    encouragement: "Equilibrium principles appear in both Chemistry theory and practical questions. The logic behind Le Chatelier's Principle is consistent — learn it well once and it applies to every equilibrium problem!"
  },
  "Acids, Bases & Salts": {
    tips: [
      "Know the strong acids (HCl, H₂SO₄, HNO₃) and strong bases (NaOH, KOH) — they fully dissociate.",
      "pH < 7 = acidic, pH = 7 = neutral, pH > 7 = alkaline. Know indicator colours for each range.",
      "Practice salt preparation methods: neutralisation, direct combination, precipitation and displacement."
    ],
    resources: ["New School Chemistry (Ababio)", "WAEC Past Questions (Acids & Bases)", "Practical Chemistry lab notes"],
    encouragement: "Acids, Bases & Salts is one of the highest-scoring Chemistry topics in WAEC. The concepts are everyday and intuitive — linking them to real-life examples (lemon juice is acidic, soap is alkaline) helps retention!"
  },

  // Physics topics
  "Waves": {
    tips: [
      "Memorise v = fλ (wave speed = frequency × wavelength) and use it for every wave calculation.",
      "Know the electromagnetic spectrum in order and the properties that all EM waves share.",
      "Understand the difference between transverse waves (e.g. light) and longitudinal waves (e.g. sound)."
    ],
    resources: ["New School Physics (Anyakoha)", "WAEC Past Questions (Waves)", "YouTube: Physics with Professor Leonard"],
    encouragement: "Waves questions in WAEC are almost always calculation-based using v = fλ. Once you're confident with the formula and unit conversions, this becomes one of the easiest mark-scoring areas in Physics!"
  },
  "Electricity": {
    tips: [
      "Memorise Ohm's Law: V = IR and know how to rearrange it.",
      "For resistors in series: R_total = R₁ + R₂ + R₃. For parallel: 1/R = 1/R₁ + 1/R₂ + 1/R₃.",
      "Power formulas: P = IV = I²R = V²/R. Know all three versions."
    ],
    resources: ["New School Physics (Anyakoha) — Electricity chapters", "WAEC Past Questions (Electricity)", "PhET Circuit Simulator (free online)"],
    encouragement: "Electricity questions are calculation-heavy but formula-driven. Students who memorise and practise Ohm's Law, power formulas and circuit rules consistently score high marks in this section!"
  },
  "Mechanics": {
    tips: [
      "Newton's three laws of motion must be memorised word-for-word — WAEC often asks you to state them.",
      "For energy questions: KE = ½mv², PE = mgh. Know when energy converts between the two forms.",
      "Practise equations of motion: v = u + at, s = ut + ½at², v² = u² + 2as."
    ],
    resources: ["New School Physics (Anyakoha)", "WAEC Past Questions (Mechanics)", "YouTube: Michel van Biezen Physics"],
    encouragement: "Mechanics carries the most marks in WAEC Physics. The equations of motion and energy formulas appear in almost every paper. Daily practice with numerical problems is the fastest path to improvement here!"
  },
  "Optics": {
    tips: [
      "Know the lens formula: 1/f = 1/v - 1/u (using real-is-positive convention).",
      "Magnification: m = v/u = image height/object height.",
      "Understand the difference between converging (convex) and diverging (concave) lenses and their ray diagrams."
    ],
    resources: ["New School Physics (Anyakoha) — Light chapters", "WAEC Past Questions (Optics)", "YouTube: Optics for WAEC"],
    encouragement: "Optics questions follow a predictable pattern — lens formula, mirror formula, and ray diagrams. Once you practise these with past questions, you'll find them among the most straightforward questions in WAEC Physics!"
  },
  "Radioactivity": {
    tips: [
      "Know the three types of radiation: alpha (α), beta (β), gamma (γ) and their properties (charge, mass, penetration).",
      "Half-life formula: N = N₀ × (1/2)ⁿ where n = number of half-lives elapsed.",
      "Understand nuclear equations — the mass numbers and atomic numbers must balance on both sides."
    ],
    resources: ["New School Physics (Anyakoha) — Radioactivity chapter", "WAEC Past Questions (Radioactivity)", "YouTube: Radioactivity for WAEC NECO"],
    encouragement: "Radioactivity questions are very formulaic in WAEC. The half-life calculation appears in nearly every paper and follows the exact same method every time. Practise 10 past questions and you'll have it mastered!"
  },

  // Economics topics
  "Microeconomics": {
    tips: [
      "Know the laws of demand and supply, and what causes shifts vs movements along the curves.",
      "Understand all types of elasticity: PED, PES, YED, XED — their formulas and interpretations.",
      "Study market structures: perfect competition, monopoly, oligopoly and monopolistic competition."
    ],
    resources: ["Amplified Economics for SS3 (Femi Longe)", "WAEC Past Questions (Economics)", "EconplusDal YouTube channel"],
    encouragement: "Microeconomics is the foundation of WAEC Economics. The demand-supply framework appears across many questions. A solid understanding here gives you tools to answer even unfamiliar questions logically!"
  },
  "Macroeconomics": {
    tips: [
      "Know the functions and instruments of monetary policy (CBN) and fiscal policy (government budget).",
      "Understand GDP, GNP and national income calculations and their differences.",
      "Study inflation: types (demand-pull, cost-push), causes, effects and government remedies."
    ],
    resources: ["Amplified Economics for SS3", "WAEC Past Questions (Macroeconomics)", "CBN website for current data"],
    encouragement: "Macroeconomics questions often relate to Nigeria's real economy — which makes them more interesting to study. Connecting concepts like inflation and monetary policy to current news helps them stick in memory!"
  },

  // Government topics
  "Nigerian Constitution": {
    tips: [
      "Know the structure of the 1999 Constitution: the Exclusive, Concurrent and Residual legislative lists.",
      "Memorise key sections: Chapter 2 (Fundamental Objectives), Chapter 4 (Fundamental Rights), Chapter 5 (Legislature).",
      "Know the amendment procedure and how many states must ratify a constitutional amendment."
    ],
    resources: ["Government for Senior Secondary Schools (Shuaib)", "WAEC Past Questions (Government)", "The 1999 Constitution of Nigeria (free PDF)"],
    encouragement: "Nigerian Constitution questions are very direct and factual. Students who read the constitution alongside their textbook and past questions consistently score high marks in this section. It rewards preparation!"
  },
  "International Organisations": {
    tips: [
      "Know the founding dates, headquarters and objectives of: UN, AU, ECOWAS, Commonwealth, OPEC, NATO.",
      "Study Nigeria's role in each organisation — WAEC often asks application-level questions.",
      "Know the specialised agencies of the UN: WHO, UNESCO, UNICEF, FAO, ILO and their functions."
    ],
    resources: ["Government for Senior Secondary Schools", "WAEC Past Questions (International Relations)", "UN.org for current information"],
    encouragement: "International Organisations is a factual topic that rewards systematic memorisation. Creating a table with Organisation, Founded, HQ, Purpose for each body is an effective revision strategy!"
  },
  "Political Concepts": {
    tips: [
      "Know the key concepts: democracy, federalism, separation of powers, rule of law, constitutionalism.",
      "Understand different types of government: presidential vs parliamentary, unitary vs federal, democracy vs autocracy.",
      "Be able to explain advantages AND disadvantages of each system — WAEC asks for both."
    ],
    resources: ["Government for Senior Secondary Schools (Shuaib)", "WAEC Past Questions (Political Concepts)", "Introduction to Political Science textbooks"],
    encouragement: "Political concepts form the theoretical backbone of Government. Mastering the definitions and being able to apply them to Nigerian examples will set your answers apart from average candidates!"
  },
  "Nigerian History": {
    tips: [
      "Know key dates: 1914 (Amalgamation), 1960 (Independence), 1963 (Republic), 1966 (First Coup), 1999 (Democracy).",
      "Study the colonial period, nationalist movements and key figures: Zik, Awolowo, Sardauna, Balewa.",
      "Understand the causes and consequences of the Nigerian Civil War (1967–1970)."
    ],
    resources: ["Government for Senior Secondary Schools", "WAEC Past Questions (Nigerian History)", "Nigeria Since Independence — historical texts"],
    encouragement: "Nigerian History in Government is not just memorisation — WAEC wants you to explain causes, effects and significance. Understanding the WHY behind events helps you answer both factual and analytical questions!"
  },

  // Geography topics
  "Climate": {
    tips: [
      "Know Nigeria's vegetation zones from south to north: Mangrove → Rain Forest → Guinea Savanna → Sudan Savanna → Sahel.",
      "Understand the factors affecting climate: latitude, altitude, distance from sea, winds and ocean currents.",
      "Study the ITCZ movement and how it determines Nigeria's dry and rainy seasons."
    ],
    resources: ["New Oxford Geography for SS3", "WAEC Past Questions (Physical Geography)", "Nigerian Meteorological Agency (NIMET) website"],
    encouragement: "Climate and vegetation questions appear in every WAEC Geography paper. Nigeria's geography is your context — connecting what you study to the environment around you makes the information much easier to retain!"
  },
  "Population": {
    tips: [
      "Know the factors affecting population distribution in Nigeria: relief, climate, soil, water, economic activities.",
      "Understand demographic concepts: birth rate, death rate, natural increase, population density, dependency ratio.",
      "Study the effects of population growth on Nigeria's economy, environment and social services."
    ],
    resources: ["New Oxford Geography for SS3 (Population chapter)", "WAEC Past Questions (Human Geography)", "National Population Commission Nigeria website"],
    encouragement: "Population Geography connects to real issues in Nigeria today. Your understanding of why cities like Lagos are overcrowded gives you a real advantage in answering these questions with depth and local examples!"
  },
  "Map Reading": {
    tips: [
      "Practice calculating distances using map scales: map distance × denominator of scale = real distance.",
      "Know how to interpret contour lines: spacing indicates gradient — close together = steep, far apart = gentle.",
      "Practice identifying landforms from contour maps: hills, valleys, ridges, escarpments and spurs."
    ],
    resources: ["New Oxford Geography for SS3 (Map Reading chapters)", "WAEC Practical Geography Past Questions", "Ordnance Survey map reading guides"],
    encouragement: "Map Reading is a practical skill that improves quickly with practice. WAEC provides the map — your job is to read it correctly. Regular practice with past WAEC map questions is the single most effective revision strategy here!"
  },
  "Natural Resources": {
    tips: [
      "Know the locations of Nigeria's key resources: crude oil (Niger Delta), coal (Enugu), tin (Jos Plateau), limestone (Ewekoro).",
      "Understand renewable vs non-renewable resources and the concept of sustainable development.",
      "Study the advantages and problems associated with oil production in Nigeria."
    ],
    resources: ["New Oxford Geography for SS3 (Resources chapter)", "WAEC Past Questions", "NNPC website for oil data"],
    encouragement: "Nigeria's natural resources are literally part of your daily life. This makes the topic relatable and easier to study with depth. Use Nigerian news stories about oil, farming and mining to bring your answers to life!"
  },

  // Civic Education
  "Human Rights": {
    tips: [
      "Know all the rights in Chapter 4 of the 1999 Constitution (Sections 33–46) and what each covers.",
      "Understand the difference between absolute rights (cannot be derogated) and qualified rights.",
      "Know the NHRC (National Human Rights Commission) and its role in protecting citizens' rights."
    ],
    resources: ["Civic Education for SS3 (MAN)", "WAEC Past Questions (Civic Education)", "The 1999 Nigerian Constitution — Chapter 4"],
    encouragement: "Human Rights is a topic you should care about — these rights protect YOU. Understanding them deeply makes answering exam questions natural because you're writing about real protections that matter to every Nigerian!"
  },
  "Democracy": {
    tips: [
      "Know the features of democracy: free elections, rule of law, separation of powers, fundamental rights, majority rule with minority protection.",
      "Understand types of democracy: direct (ancient Athens) and representative/indirect (modern Nigeria).",
      "Know the challenges to democracy in Nigeria: corruption, poverty, illiteracy, electoral malpractice."
    ],
    resources: ["Civic Education for SS3", "WAEC Past Questions (Democracy)", "INEC website for Nigerian electoral information"],
    encouragement: "Democracy questions ask you to connect theory to Nigeria's reality. Students who relate their answers to real examples from Nigeria's political history consistently score higher than those who give only abstract answers!"
  },
  "Citizenship": {
    tips: [
      "Know the difference between citizens' rights (entitlements) and obligations (duties).",
      "Understand the three ways to acquire Nigerian citizenship: birth, registration and naturalisation.",
      "Know what constitutes good citizenship and the consequences of bad citizenship behaviour."
    ],
    resources: ["Civic Education for SS3 (MAN)", "WAEC Past Questions (Citizenship)", "Nigerian Citizenship and Immigration Service"],
    encouragement: "Citizenship topics are straightforward and reward clear, organised answers. Learning the rights and duties in a structured way — perhaps with a table — makes revision efficient and exam answers comprehensive!"
  },

  // Literature
  "Drama": {
    tips: [
      "Know the plot, characters, themes and setting of each prescribed drama text inside out.",
      "Understand dramatic devices: aside, soliloquy, dramatic irony, conflict, climax, denouement.",
      "Practice writing character analysis — WAEC often asks you to assess a character's role in the play."
    ],
    resources: ["The prescribed WAEC text(s) for your year", "Literature in English Past Questions (WAEC)", "Sparknotes for plot summaries (use as supplement only)"],
    encouragement: "Literature rewards those who read the texts carefully and think about them deeply. Reading a prescribed text twice — once for story, once for themes and techniques — gives you everything you need for a high score!"
  },
  "Poetry": {
    tips: [
      "Learn poetic devices: alliteration, assonance, onomatopoeia, personification, simile, metaphor, irony, hyperbole.",
      "For unseen poetry questions, read the poem three times: first for meaning, then for devices, then for tone.",
      "Know the structural elements: stanza, line, rhyme scheme, rhythm, metre."
    ],
    resources: ["Literature in English for SS3 (prescribed texts)", "WAEC Past Questions (Poetry)", "Poetry Foundation website"],
    encouragement: "Poetry questions seem intimidating but follow a clear pattern: identify devices, explain their effect, and connect them to the poem's meaning. With practice on past questions, this becomes one of the most manageable sections!"
  },
  "Prose": {
    tips: [
      "Know each prescribed prose text thoroughly: plot summary, all major and minor characters, themes, setting and style.",
      "Practice writing about themes — identify them and use specific evidence (quotations or scene references) from the text.",
      "Understand the narrative technique: first person, third person, omniscient narrator — and its effect on the reader."
    ],
    resources: ["The prescribed WAEC prose texts for your year", "WAEC Past Questions (Prose)", "Things Fall Apart, The African Child (common texts)"],
    encouragement: "Prose questions are very answerable if you know your texts well. WAEC rewards candidates who show they've genuinely engaged with the story and can discuss characters and themes with specific textual evidence!"
  },

  // Default for any unrecognised topic
  "General": {
    tips: [
      "Review your class notes and textbook on this topic thoroughly.",
      "Practice with WAEC past questions from 2015 to 2023 to understand the question patterns.",
      "Form a study group with classmates to discuss and explain concepts to each other."
    ],
    resources: ["WAEC Past Questions (subject-specific)", "Your subject textbook", "WAEC Chief Examiner's Report (free on WAEC website)"],
    encouragement: "Every topic can be improved with focused, consistent practice. Identify exactly which sub-topics are causing difficulty, tackle them one at a time, and use past questions to measure your progress. You've got this!"
  }
};

// ===== STATE =====
let state = {
  subject: "",
  sessionQuestions: [],
  currentIndex: 0,
  selectedOption: null,
  score: 0,
  answered: false,
  totalAnswered: 0,
  totalCorrect: 0,        // cumulative across sessions — never resets
  performance: {},        // lifetime topic tracker — persisted in localStorage
  sessionPerformance: {}  // current session only — used for summary weak areas
};

// ===== PERSISTENCE =====
function saveProgress() {
  try {
    localStorage.setItem("eb_performance", JSON.stringify(state.performance));
    localStorage.setItem("eb_totals", JSON.stringify({
      totalAnswered: state.totalAnswered,
      totalCorrect:  state.totalCorrect
    }));
  } catch(e) { /* localStorage unavailable — silently ignore */ }
}

function loadProgress() {
  try {
    const perf   = localStorage.getItem("eb_performance");
    const totals = localStorage.getItem("eb_totals");
    if (perf)   state.performance    = JSON.parse(perf);
    if (totals) {
      const t = JSON.parse(totals);
      state.totalAnswered = t.totalAnswered || 0;
      state.totalCorrect  = t.totalCorrect  || 0;
    }
  } catch(e) { console.warn("ExamBoost: could not load saved progress."); }
}

loadProgress();

// ===== DOM REFS =====
const subjectSelect       = document.getElementById("subject-select");
const startBtn            = document.getElementById("start-btn");
const selectorSection     = document.getElementById("selector-section");
const questionSection     = document.getElementById("question-section");
const feedbackSection     = document.getElementById("feedback-section");
const summarySection      = document.getElementById("summary-section");

const subjectLabel        = document.getElementById("current-subject-label");
const topicLabel          = document.getElementById("current-topic-label");
const questionCounter     = document.getElementById("question-counter");
const questionText        = document.getElementById("question-text");
const optionsList         = document.getElementById("options-list");
const submitBtn           = document.getElementById("submit-btn");
const nextBtn             = document.getElementById("next-btn");

const feedbackSection2    = null; // removed — feedbackSection (line above) already holds this ref
const feedbackBadge       = document.getElementById("feedback-badge");
const feedbackHeader      = document.getElementById("feedback-header");
const correctAnswerDisplay= document.getElementById("correct-answer-display");
const explanationText     = document.getElementById("explanation-text");

const scoreDisplay        = document.getElementById("score-display");
const scoreDenom          = document.getElementById("score-denom");
const scorePct            = document.getElementById("score-pct");

// Timer & change-subject refs
const timerFill         = document.getElementById("timer-fill");
const timerDisplay      = document.getElementById("timer-display");
const changeSubjectBtn  = document.getElementById("change-subject-btn");

// ===== TIMER ENGINE =====
let timerInterval = null;
let timerSeconds  = 0;

function startTimer() {
  clearTimer();
  timerSeconds = QUESTION_TIME_SECONDS;
  updateTimerUI(timerSeconds);

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerUI(timerSeconds);

    if (timerSeconds <= 0) {
      clearTimer();
      if (!state.answered) {
        timeUp();
      }
    }
  }, 1000);
}

function clearTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function updateTimerUI(secs) {
  if (!timerFill || !timerDisplay) return;
  const pct = (secs / QUESTION_TIME_SECONDS) * 100;
  timerFill.style.width = pct + "%";

  const mins = Math.floor(secs / 60);
  const s    = secs % 60;
  timerDisplay.textContent = `${mins}:${s.toString().padStart(2, "0")}`;

  // Colour states
  const level = secs <= 10 ? "danger" : secs <= 30 ? "warn" : "";
  timerFill.className    = "timer-fill"    + (level ? " " + level : "");
  timerDisplay.className = "timer-display" + (level ? " " + level : "");
}

function timeUp() {
  // Auto-mark as wrong and show feedback — student ran out of time
  state.answered     = true;
  state.totalAnswered++;

  const q     = state.sessionQuestions[state.currentIndex];
  const topic = q.topic || "General";
  if (!state.performance[topic])        state.performance[topic]        = { correct: 0, total: 0 };
  if (!state.sessionPerformance[topic]) state.sessionPerformance[topic] = { correct: 0, total: 0 };
  state.performance[topic].total++;
  state.sessionPerformance[topic].total++;
  saveProgress();

  // Reveal correct answer on all buttons
  document.querySelectorAll(".option-btn").forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add("correct");
  });

  // Show feedback with "Time's up!" message
  feedbackSection.classList.remove("hidden");
  feedbackHeader.className = "feedback-header wrong-header";
  feedbackBadge.textContent = "⏰  Time's up!";
  feedbackBadge.className   = "feedback-badge wrong";
  const letters = ["A", "B", "C", "D"];
  correctAnswerDisplay.textContent =
    `Correct answer: ${letters[q.answer]}. ${q.options[q.answer]}`;
  explanationText.textContent = "";
  explanationText.classList.add("loading-dots");
  fetchExplanation(q, false);

  renderTracker();
  updateHeaderStats();
  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");

  // Shake the timer display for feedback
  if (timerDisplay) {
    timerDisplay.textContent = "0:00";
    timerFill.style.width    = "0%";
    timerFill.className      = "timer-fill danger";
  }
}
const scoreRing           = document.getElementById("score-ring");
const correctCount        = document.getElementById("correct-count");
const wrongCount          = document.getElementById("wrong-count");
const accuracyDisplay     = document.getElementById("accuracy-display");
const weakAreasList       = document.getElementById("weak-areas-list");
const restartBtn          = document.getElementById("restart-btn");
const topicStats          = document.getElementById("topic-stats");
const progressFill        = document.getElementById("progress-fill");
const progressFraction    = document.getElementById("progress-fraction");

const headerTotalQ        = document.getElementById("header-total-q");
const headerAccuracy      = document.getElementById("header-accuracy");
const headerSubjects      = document.getElementById("header-subjects");

// ===== INIT =====
subjectSelect.addEventListener("change", () => {
  startBtn.disabled = subjectSelect.value === "";
});
startBtn.addEventListener("click", startSession);
submitBtn.addEventListener("click", submitAnswer);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", resetToStart);
if (changeSubjectBtn) changeSubjectBtn.addEventListener("click", () => {
  clearTimer();
  resetToStart();
});

// ===== KEYBOARD NAVIGATION =====
// A/B/C/D or 1/2/3/4 to pick option; Enter to submit or advance
document.addEventListener("keydown", (e) => {
  if (!questionSection || questionSection.classList.contains("hidden")) return;

  // After answering — Enter or → to go to next question
  if (state.answered) {
    if ((e.key === "Enter" || e.key === "ArrowRight") && !nextBtn.classList.contains("hidden")) {
      nextQuestion();
    }
    return;
  }

  // Option selection
  const keyMap = { a: 0, b: 1, c: 2, d: 3, "1": 0, "2": 1, "3": 2, "4": 3 };
  const idx = keyMap[e.key.toLowerCase()];
  if (idx !== undefined) {
    const btns = document.querySelectorAll(".option-btn");
    if (btns[idx] && !btns[idx].disabled) selectOption(btns[idx], idx);
    return;
  }

  // Enter to submit when an option is selected
  if (e.key === "Enter" && state.selectedOption !== null && !submitBtn.disabled) {
    submitAnswer();
  }
});

updateHeaderStats();

// ===== SESSION MANAGEMENT =====
function startSession() {
  state.subject        = subjectSelect.value;
  state.currentIndex   = 0;
  state.score          = 0;
  state.answered       = false;
  state.selectedOption = null;
  state.sessionPerformance = {};  // reset session tracker for fresh summary

  const subjectName = formatSubject(state.subject).toLowerCase();
  const pool = questions
    .filter(q => q.subject.toLowerCase() === subjectName)
    .map(q => {
      const answerIndex = q.options.indexOf(q.answer);
      return {
        question:    q.question,
        options:     q.options,
        answer:      answerIndex !== -1 ? answerIndex : 0,
        topic:       q.topic || "General",
        explanation: q.explanation_hint || ""
      };
    });

  if (pool.length === 0) {
    const hint = selectorSection.querySelector(".selector-hint");
    const existing = selectorSection.querySelector(".inline-error");
    if (!existing) {
      const err = document.createElement("p");
      err.className = "inline-error";
      err.style.cssText = "margin-top:10px;font-size:.85rem;color:#dc2626;font-weight:600;";
      err.textContent = "⚠ No questions available for this subject yet. Please choose another.";
      hint.after(err);
      setTimeout(() => err.remove(), 4000);
    }
    return;
  }

  shuffle(pool);
  state.sessionQuestions = pool.slice(0, Math.min(QUESTIONS_PER_SESSION, pool.length));

  selectorSection.classList.add("hidden");
  summarySection.classList.add("hidden");
  feedbackSection.classList.add("hidden");
  questionSection.classList.remove("hidden");

  renderQuestion();
}

function resetToStart() {
  summarySection.classList.add("hidden");
  feedbackSection.classList.add("hidden");
  questionSection.classList.add("hidden");
  selectorSection.classList.remove("hidden");
  subjectSelect.value = "";
  startBtn.disabled = true;
}

// ===== QUESTION RENDERING =====
function renderQuestion() {
  const q     = state.sessionQuestions[state.currentIndex];
  const total = state.sessionQuestions.length;
  const idx   = state.currentIndex;

  state.answered     = false;
  state.selectedOption = null;

  // Progress bar
  const pct = Math.round((idx / total) * 100);
  if (progressFill)    progressFill.style.width = pct + "%";
  if (progressFraction) progressFraction.textContent = `${idx + 1} / ${total}`;

  // Meta
  subjectLabel.textContent = formatSubject(state.subject);
  topicLabel.textContent   = q.topic || "General";
  questionCounter.textContent = `Question ${idx + 1} of ${total}`;

  // Question text
  questionText.textContent = q.question;

  // Options
  optionsList.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.dataset.index = i;
    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-text">${opt}</span>
    `;
    btn.addEventListener("click", () => selectOption(btn, i));
    optionsList.appendChild(btn);
  });

  submitBtn.disabled = true;
  submitBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  feedbackSection.classList.add("hidden");

  startTimer(); // begin countdown for this question
}

function selectOption(clickedBtn, index) {
  if (state.answered) return;
  document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  clickedBtn.classList.add("selected");
  state.selectedOption = index;
  submitBtn.disabled = false;
}

// ===== ANSWER CHECKING =====
function submitAnswer() {
  if (state.selectedOption === null || state.answered) return;
  clearTimer(); // stop countdown the moment student submits
  state.answered = true;
  state.totalAnswered++;

  const q         = state.sessionQuestions[state.currentIndex];
  const isCorrect = state.selectedOption === q.answer;

  if (isCorrect) {
    state.score++;
    state.totalCorrect++;  // cumulative — never resets
  }

  // Track performance per topic in BOTH lifetime and session trackers
  const topic = q.topic || "General";
  if (!state.performance[topic])        state.performance[topic]        = { correct: 0, total: 0 };
  if (!state.sessionPerformance[topic]) state.sessionPerformance[topic] = { correct: 0, total: 0 };
  state.performance[topic].total++;
  state.sessionPerformance[topic].total++;
  if (isCorrect) {
    state.performance[topic].correct++;
    state.sessionPerformance[topic].correct++;
  }
  saveProgress();

  // Style option buttons
  document.querySelectorAll(".option-btn").forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer)                        btn.classList.add("correct");
    else if (i === state.selectedOption && !isCorrect) btn.classList.add("wrong");
  });

  showFeedback(isCorrect, q);
  renderTracker();
  updateHeaderStats();

  submitBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}

// ===== FEEDBACK =====
function showFeedback(isCorrect, q) {
  feedbackSection.classList.remove("hidden");

  // Header style
  feedbackHeader.className = "feedback-header " + (isCorrect ? "correct-header" : "wrong-header");

  // Badge
  feedbackBadge.textContent = isCorrect ? "✓  Correct!" : "✗  Incorrect";
  feedbackBadge.className   = "feedback-badge " + (isCorrect ? "correct" : "wrong");

  // Correct answer hint if wrong
  if (!isCorrect) {
    const letters = ["A", "B", "C", "D"];
    correctAnswerDisplay.textContent =
      `Correct answer: ${letters[q.answer]}. ${q.options[q.answer]}`;
  } else {
    correctAnswerDisplay.textContent = "";
  }

  // AI explanation
  explanationText.textContent = "";
  explanationText.classList.add("loading-dots");
  fetchExplanation(q, isCorrect);
}

// ===== MOCK AI EXPLANATION =====
/*  LIVE API VERSION — uncomment when API key is available
async function fetchExplanation(q, isCorrect) {
  const prompt = `
You are a helpful Nigerian secondary school exam tutor.
A student is practicing for WAEC/NECO exams. They just answered this question:
Subject: ${formatSubject(state.subject)}
Topic: ${q.topic || "General"}
Question: ${q.question}
Options: ${q.options.map((o, i) => `${["A","B","C","D"][i]}. ${o}`).join(" | ")}
Correct answer: ${["A","B","C","D"][q.answer]}. ${q.options[q.answer]}
Student answered: ${isCorrect ? "correctly" : "incorrectly"}
Give a clear, concise explanation (3-5 sentences) of why the correct answer is right.
Use simple English suitable for a Nigerian secondary school student.
Do not repeat the question. Go straight to the explanation.
`.trim();

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    explanationText.classList.remove("loading-dots");
    if (data.content && data.content[0] && data.content[0].text) {
      explanationText.textContent = data.content[0].text;
    } else {
      explanationText.textContent = "Explanation unavailable. Check your API key.";
    }
  } catch (err) {
    explanationText.classList.remove("loading-dots");
    explanationText.textContent = "⚠ Network error — could not reach the AI.";
    console.error("Claude API error:", err);
  }
}
*/

// MOCK VERSION (active for demo)
async function fetchExplanation(q, isCorrect) {
  await delay(900);
  explanationText.classList.remove("loading-dots");

  if (q.explanation) {
    explanationText.textContent = q.explanation;
  } else {
    const letters = ["A", "B", "C", "D"];
    const correct = `${letters[q.answer]}. ${q.options[q.answer]}`;
    explanationText.textContent =
      `The correct answer is ${correct}. ` +
      `This is a key concept in ${q.topic || formatSubject(state.subject)} ` +
      `that frequently appears in WAEC and NECO examinations. ` +
      `Review this topic in your textbook and practise similar questions ` +
      `to strengthen your understanding before the exam.`;
  }
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ===== NAVIGATION =====
function nextQuestion() {
  state.currentIndex++;
  if (state.currentIndex >= state.sessionQuestions.length) {
    showSummary();
  } else {
    renderQuestion();
  }
}

// ===== SESSION SUMMARY =====
function showSummary() {
  clearTimer();
  questionSection.classList.add("hidden");
  feedbackSection.classList.add("hidden");
  summarySection.classList.remove("hidden");

  const total   = state.sessionQuestions.length;
  const correct = state.score;
  const wrong   = total - correct;
  const pct     = Math.round((correct / total) * 100);

  // Score ring (SVG arc — circumference 2π×58 ≈ 364.4)
  const circumference = 364.4;
  const arc = document.getElementById("score-arc");
  if (arc) {
    const offset = circumference - (pct / 100) * circumference;
    arc.style.strokeDashoffset = offset;
    const arcColor = pct >= 70 ? "var(--correct)" : pct >= 40 ? "var(--accent-dark)" : "var(--wrong)";
    arc.style.stroke = arcColor;
  }

  // Ring text
  const sdEl = document.getElementById("score-display");
  const sdDenom = document.getElementById("score-denom");
  const sdPct   = document.getElementById("score-pct");
  if (sdEl)    sdEl.textContent   = correct;
  if (sdDenom) sdDenom.textContent = `/ ${total}`;
  if (sdPct) {
    sdPct.textContent = `${pct}%`;
    sdPct.style.fill  = pct >= 70 ? "var(--correct)" : pct >= 40 ? "var(--accent-dark)" : "var(--wrong)";
  }

  // (keeping old scoreDisplay/scoreDenom/scorePct/scoreRing refs harmless)
  const level = pct >= 70 ? "excellent" : pct >= 40 ? "good" : "poor";

  // Stats row
  if (correctCount)  correctCount.textContent  = correct;
  if (wrongCount)    wrongCount.textContent     = wrong;
  if (accuracyDisplay) accuracyDisplay.textContent = pct + "%";

  // Progress bar — 100% at end
  if (progressFill)     progressFill.style.width = "100%";
  if (progressFraction) progressFraction.textContent = `${total} / ${total}`;

  // Weak areas
  renderWeakAreas();
  updateHeaderStats();
}

// ===== RICH WEAK AREAS =====
function renderWeakAreas() {
  weakAreasList.innerHTML = "";

  const weak = Object.entries(state.sessionPerformance)
    .filter(([, v]) => v.total > 0 && (v.correct / v.total) < 0.7)
    .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total));

  if (weak.length === 0) {
    weakAreasList.innerHTML = `
      <div class="all-good-banner">
        <span class="icon">🌟</span>
        <p>Excellent work! No major weak areas this session. You scored 70% or above on every topic practised. Keep up this level of preparation and you'll excel in your exams!</p>
      </div>`;
    return;
  }

  weak.forEach(([topic, v]) => {
    const pct   = Math.round((v.correct / v.total) * 100);
    const level = pct < 40 ? "low" : "medium";
    const tips  = getStudyTips(topic);

    const card = document.createElement("div");
    card.className = `weak-area-card ${level}`;

    const tipsHTML = tips.tips
      .map(t => `<li>${t}</li>`)
      .join("");

    const resourcesHTML = tips.resources
      .map(r => `<span class="resource-chip">📖 ${r}</span>`)
      .join("");

    card.innerHTML = `
      <div class="weak-area-header">
        <span class="weak-area-topic">${topic}</span>
        <span class="weak-area-score ${level}">${v.correct}/${v.total} correct (${pct}%)</span>
      </div>
      <div class="weak-area-bar">
        <div class="weak-area-bar-fill ${level}" style="width: ${pct}%"></div>
      </div>
      <ul class="weak-area-tips">${tipsHTML}</ul>
      <div class="weak-area-resources">${resourcesHTML}</div>
      <div class="weak-area-encouragement">💪 ${tips.encouragement}</div>
    `;

    weakAreasList.appendChild(card);
  });
}

function getStudyTips(topic) {
  return studyTips[topic] || studyTips["General"];
}

// ===== PERFORMANCE TRACKER =====
function renderTracker() {
  if (Object.keys(state.performance).length === 0) return;

  topicStats.innerHTML = "";

  Object.entries(state.performance).forEach(([topic, v]) => {
    const pct   = Math.round((v.correct / v.total) * 100);
    const level = pct >= 70 ? "high" : pct >= 40 ? "medium" : "low";

    const row = document.createElement("div");
    row.className = "topic-row";
    row.innerHTML = `
      <span class="topic-name" title="${topic}">${topic}</span>
      <div class="topic-bar-bg">
        <div class="topic-bar-fill ${level}" style="width: ${pct}%"></div>
      </div>
      <div class="topic-right">
        <span class="topic-pct ${level}">${pct}%</span>
        <span class="topic-fraction">${v.correct}/${v.total}</span>
      </div>
    `;
    topicStats.appendChild(row);
  });
}

// ===== HEADER STATS =====
function updateHeaderStats() {
  const totalQ    = state.totalAnswered;
  const subjects  = Object.keys(
    questions.reduce((acc, q) => { acc[q.subject] = true; return acc; }, {})
  ).length;

  let accuracy = 0;
  if (totalQ > 0) {
    accuracy = Math.round((state.totalCorrect / totalQ) * 100);
  }

  if (headerTotalQ)  headerTotalQ.textContent  = totalQ;
  if (headerAccuracy) headerAccuracy.textContent = accuracy + "%";
  if (headerSubjects) headerSubjects.textContent = subjects;
}

// ===== HELPERS =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function formatSubject(slug) {
  const map = {
    mathematics: "Mathematics",
    english:     "English Language",
    biology:     "Biology",
    chemistry:   "Chemistry",
    physics:     "Physics",
    geography:   "Geography",
    economics:   "Economics",
    government:  "Government",
    literature:  "Literature in English",
    civic:       "Civic Education"
  };
  return map[slug] || slug;
}
