import type { CivicsQuestion } from '../types';

// ─── AMERICAN GOVERNMENT ────────────────────────────────────────────────────
// Principles of American Democracy (Q1–Q12)
// System of Government (Q13–Q47)
// Rights and Responsibilities (Q48–Q57)
//
// AMERICAN HISTORY ────────────────────────────────────────────────────────────
// Colonial Period and Independence (Q58–Q70)
// 1800s (Q71–Q77)
// Recent American History (Q78–Q87)
//
// INTEGRATED CIVICS ───────────────────────────────────────────────────────────
// Geography (Q88–Q95)
// Symbols (Q96–Q98)
// Holidays (Q99–Q100)

export const CIVICS: CivicsQuestion[] = [

  // ── Principles of American Democracy ──────────────────────────────────────

  // Q1
  {
    q: "What is the supreme law of the land?",
    o: ["The Constitution", "The Bill of Rights", "The Declaration of Independence", "Federal law"],
    a: 0,
  },
  // Q2
  {
    q: "What does the Constitution do?",
    o: [
      "Sets up the government, defines the government, and protects basic rights",
      "Declares independence from Britain",
      "Establishes the military chain of command",
      "Creates the federal tax system",
    ],
    a: 0,
  },
  // Q3
  {
    q: "The idea of self-government is in the first three words of the Constitution. What are these words?",
    o: ["We the People", "In Order To", "Establish this Constitution", "Form a Union"],
    a: 0,
  },
  // Q4
  {
    q: "What is an amendment?",
    o: [
      "A change or addition to the Constitution",
      "A presidential executive order",
      "A law passed by Congress",
      "A Supreme Court ruling",
    ],
    a: 0,
  },
  // Q5
  {
    q: "What do we call the first ten amendments to the Constitution?",
    o: ["The Bill of Rights", "The Articles of Confederation", "The Federalist Papers", "The Preamble"],
    a: 0,
  },
  // Q6
  {
    q: "What is one right or freedom from the First Amendment?",
    o: ["Freedom of speech", "Right to bear arms", "Right to a jury trial", "Right to vote"],
    a: 0,
  },
  // Q7
  {
    q: "How many amendments does the Constitution have?",
    o: ["27", "10", "21", "33"],
    a: 0,
  },
  // Q8
  {
    q: "What did the Declaration of Independence do?",
    o: [
      "Announced our independence from Great Britain",
      "Created the three branches of government",
      "Abolished slavery",
      "Established the Supreme Court",
    ],
    a: 0,
  },
  // Q9
  {
    q: "What are two rights in the Declaration of Independence?",
    o: [
      "Life and liberty",
      "Voting and free education",
      "Property and free speech",
      "Privacy and free press",
    ],
    a: 0,
  },
  // Q10
  {
    q: "What is freedom of religion?",
    o: [
      "You can practice any religion, or not practice a religion",
      "The government chooses a national religion",
      "You must register your religion with the government",
      "Only certain religions are permitted",
    ],
    a: 0,
  },
  // Q11
  {
    q: "What is the economic system in the United States?",
    o: ["Capitalist economy", "Communist economy", "Socialist economy", "Feudal economy"],
    a: 0,
  },
  // Q12
  {
    q: "What is the 'rule of law'?",
    o: [
      "Everyone must follow the law",
      "The President can override any law",
      "Only citizens must follow the law",
      "Laws only apply to government officials",
    ],
    a: 0,
  },

  // ── System of Government ──────────────────────────────────────────────────

  // Q13
  {
    q: "Name one branch or part of the government.",
    o: ["Congress (legislative)", "The military", "The Federal Reserve", "The electoral college"],
    a: 0,
  },
  // Q14
  {
    q: "What stops one branch of government from becoming too powerful?",
    o: [
      "Checks and balances",
      "The military",
      "Public elections",
      "The media",
    ],
    a: 0,
  },
  // Q15
  {
    q: "Who is in charge of the executive branch?",
    o: ["The President", "The Speaker of the House", "The Chief Justice", "The Vice President"],
    a: 0,
  },
  // Q16
  {
    q: "Who makes federal laws?",
    o: ["Congress", "The President", "The Supreme Court", "State governors"],
    a: 0,
  },
  // Q17
  {
    q: "What are the two parts of the U.S. Congress?",
    o: [
      "The Senate and House of Representatives",
      "The Senate and the Cabinet",
      "The House and the Supreme Court",
      "The Senate and the Electoral College",
    ],
    a: 0,
  },
  // Q18
  {
    q: "How many U.S. Senators are there?",
    o: ["100", "50", "435", "200"],
    a: 0,
  },
  // Q19
  {
    q: "We elect a U.S. Senator for how many years?",
    o: ["6 years", "2 years", "4 years", "8 years"],
    a: 0,
  },
  // Q20
  {
    q: "Who is one of your state's U.S. Senators now?",
    o: [
      "Answers will vary by state",
      "The answer is always the same nationwide",
      "Only states with large populations have Senators",
      "Senators are appointed by the President",
    ],
    a: 0,
  },
  // Q21
  {
    q: "The House of Representatives has how many voting members?",
    o: ["435", "100", "535", "350"],
    a: 0,
  },
  // Q22
  {
    q: "We elect a U.S. Representative for how many years?",
    o: ["2 years", "4 years", "6 years", "8 years"],
    a: 0,
  },
  // Q23
  {
    q: "Name your U.S. Representative.",
    o: [
      "Answers will vary by congressional district",
      "Representatives are the same in every state",
      "Representatives are appointed, not elected",
      "Only large cities have Representatives",
    ],
    a: 0,
  },
  // Q24
  {
    q: "Who does a U.S. Senator represent?",
    o: [
      "All people of the state",
      "Only registered voters of the state",
      "The President who appointed them",
      "Only citizens of the state",
    ],
    a: 0,
  },
  // Q25
  {
    q: "Why do some states have more Representatives than other states?",
    o: [
      "Because of the state's population",
      "Because of the state's geographic size",
      "Because of the state's wealth",
      "Because of how long the state has been in the union",
    ],
    a: 0,
  },
  // Q26
  {
    q: "We elect a President for how many years?",
    o: ["4 years", "2 years", "6 years", "8 years"],
    a: 0,
  },
  // Q27
  {
    q: "In what month do we vote for President?",
    o: ["November", "October", "January", "September"],
    a: 0,
  },
  // Q28
  {
    q: "What is the name of the President of the United States now?",
    o: [
      "Answers may vary — name the current President",
      "The President is always the same",
      "The President is appointed by Congress",
      "There is no current President",
    ],
    a: 0,
  },
  // Q29
  {
    q: "What is the name of the Vice President of the United States now?",
    o: [
      "Answers may vary — name the current Vice President",
      "The Vice President is always the same",
      "The Vice President is elected separately from the President",
      "The Vice President is appointed by the Supreme Court",
    ],
    a: 0,
  },
  // Q30
  {
    q: "If the President can no longer serve, who becomes President?",
    o: [
      "The Vice President",
      "The Speaker of the House",
      "The Secretary of State",
      "The Chief Justice",
    ],
    a: 0,
  },
  // Q31
  {
    q: "If both the President and the Vice President can no longer serve, who becomes President?",
    o: [
      "The Speaker of the House",
      "The Secretary of State",
      "The Senate Majority Leader",
      "The Chief Justice of the Supreme Court",
    ],
    a: 0,
  },
  // Q32
  {
    q: "Who is Commander in Chief of the military?",
    o: ["The President", "The Secretary of Defense", "The Chairman of the Joint Chiefs", "The Vice President"],
    a: 0,
  },
  // Q33
  {
    q: "Who signs bills to become laws?",
    o: ["The President", "The Vice President", "The Speaker of the House", "The Chief Justice"],
    a: 0,
  },
  // Q34
  {
    q: "Who vetoes bills?",
    o: ["The President", "The Vice President", "The Senate Majority Leader", "The Chief Justice"],
    a: 0,
  },
  // Q35
  {
    q: "What does the President's Cabinet do?",
    o: [
      "Advises the President",
      "Makes federal laws",
      "Interprets the Constitution",
      "Manages the military",
    ],
    a: 0,
  },
  // Q36
  {
    q: "What are two Cabinet-level positions?",
    o: [
      "Secretary of State and Secretary of Defense",
      "Speaker of the House and Senate Majority Leader",
      "Chief Justice and Attorney General",
      "Director of the FBI and Director of the CIA",
    ],
    a: 0,
  },
  // Q37
  {
    q: "What does the judicial branch do?",
    o: [
      "Reviews laws and explains laws",
      "Makes laws",
      "Enforces laws",
      "Declares war",
    ],
    a: 0,
  },
  // Q38
  {
    q: "What is the highest court in the United States?",
    o: ["The Supreme Court", "The Court of Appeals", "The District Court", "The Federal Court"],
    a: 0,
  },
  // Q39
  {
    q: "How many justices are on the Supreme Court?",
    o: ["9", "7", "11", "12"],
    a: 0,
  },
  // Q40
  {
    q: "Who is the Chief Justice of the United States now?",
    o: [
      "John Roberts",
      "Clarence Thomas",
      "Samuel Alito",
      "Sonia Sotomayor",
    ],
    a: 0,
  },
  // Q41
  {
    q: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?",
    o: [
      "To print money",
      "To issue driver's licenses",
      "To create local governments",
      "To establish public schools",
    ],
    a: 0,
  },
  // Q42
  {
    q: "Under our Constitution, some powers belong to the states. What is one power of the states?",
    o: [
      "Provide schooling and education",
      "Print money",
      "Create an army",
      "Make treaties with foreign countries",
    ],
    a: 0,
  },
  // Q43
  {
    q: "Who is the Governor of your state now?",
    o: [
      "Answers will vary by state",
      "Governors are appointed by the President",
      "All states share the same Governor",
      "Governors are chosen by the state legislature",
    ],
    a: 0,
  },
  // Q44
  {
    q: "What is the capital of your state?",
    o: [
      "Answers will vary by state",
      "Every state capital is Washington, D.C.",
      "The capital is always the largest city",
      "State capitals are chosen by the federal government",
    ],
    a: 0,
  },
  // Q45
  {
    q: "What are the two major political parties in the United States?",
    o: [
      "Democratic and Republican",
      "Liberal and Conservative",
      "Federalist and Anti-Federalist",
      "Progressive and Libertarian",
    ],
    a: 0,
  },
  // Q46
  {
    q: "What is the political party of the President now?",
    o: [
      "Answers may vary — name the current President's party",
      "The President is always a Democrat",
      "The President is always a Republican",
      "Presidents cannot belong to a political party",
    ],
    a: 0,
  },
  // Q47
  {
    q: "What is the name of the Speaker of the House of Representatives now?",
    o: [
      "Answers may vary — name the current Speaker",
      "The Speaker is always from New York",
      "The Speaker is appointed by the President",
      "The Speaker is elected by the Senate",
    ],
    a: 0,
  },

  // ── Rights and Responsibilities ───────────────────────────────────────────

  // Q48
  {
    q: "There are four amendments to the Constitution about who can vote. Describe one of them.",
    o: [
      "Citizens 18 and older can vote",
      "Only property owners can vote",
      "Only men can vote",
      "Citizens must pass a literacy test to vote",
    ],
    a: 0,
  },
  // Q49
  {
    q: "What is one responsibility that is only for United States citizens?",
    o: [
      "Serve on a jury",
      "Pay taxes",
      "Obey the law",
      "Respect others' rights",
    ],
    a: 0,
  },
  // Q50
  {
    q: "Name one right only for United States citizens.",
    o: [
      "Vote in a federal election",
      "Freedom of speech",
      "Freedom of religion",
      "Right to a fair trial",
    ],
    a: 0,
  },
  // Q51
  {
    q: "What are two rights of everyone living in the United States?",
    o: [
      "Freedom of expression and freedom of religion",
      "The right to vote and the right to hold office",
      "Free health care and free education",
      "The right to a passport and the right to work",
    ],
    a: 0,
  },
  // Q52
  {
    q: "What do we show loyalty to when we say the Pledge of Allegiance?",
    o: [
      "The United States and the flag",
      "The President and Congress",
      "The Constitution and the Bill of Rights",
      "The Supreme Court and the military",
    ],
    a: 0,
  },
  // Q53
  {
    q: "What is one promise you make when you become a United States citizen?",
    o: [
      "Give up loyalty to other countries",
      "Learn English within five years",
      "Serve in the military for four years",
      "Live in the United States permanently",
    ],
    a: 0,
  },
  // Q54
  {
    q: "How old do citizens have to be to vote for President?",
    o: ["18 years old and older", "21 years old and older", "16 years old and older", "25 years old and older"],
    a: 0,
  },
  // Q55
  {
    q: "What are two ways that Americans can participate in their democracy?",
    o: [
      "Vote and write to their representatives",
      "Pay taxes and serve in the military",
      "Attend public schools and use public libraries",
      "Join a political party and donate to campaigns",
    ],
    a: 0,
  },
  // Q56
  {
    q: "When is the last day you can send in federal income tax forms?",
    o: ["April 15", "January 1", "July 4", "December 31"],
    a: 0,
  },
  // Q57
  {
    q: "When must all men register for the Selective Service?",
    o: [
      "Between eighteen and twenty-six years old",
      "At age 18 only",
      "Upon becoming a U.S. citizen",
      "Between sixteen and twenty-one years old",
    ],
    a: 0,
  },

  // ── Colonial Period and Independence ──────────────────────────────────────

  // Q58
  {
    q: "What is one reason colonists came to America?",
    o: [
      "Freedom",
      "To find gold for European kings",
      "To trade with Native Americans",
      "To escape cold European climates",
    ],
    a: 0,
  },
  // Q59
  {
    q: "Who lived in America before the Europeans arrived?",
    o: [
      "American Indians (Native Americans)",
      "Vikings",
      "Chinese explorers",
      "African traders",
    ],
    a: 0,
  },
  // Q60
  {
    q: "What group of people was taken to America and sold as slaves?",
    o: [
      "Africans",
      "Asians",
      "Europeans",
      "Native Americans",
    ],
    a: 0,
  },
  // Q61
  {
    q: "Why did the colonists fight the British?",
    o: [
      "Because of high taxes (taxation without representation)",
      "Because Britain refused to trade with them",
      "Because Britain tried to take their land",
      "Because of religious persecution",
    ],
    a: 0,
  },
  // Q62
  {
    q: "Who wrote the Declaration of Independence?",
    o: ["Thomas Jefferson", "George Washington", "Benjamin Franklin", "John Adams"],
    a: 0,
  },
  // Q63
  {
    q: "When was the Declaration of Independence adopted?",
    o: ["July 4, 1776", "July 4, 1787", "September 17, 1787", "April 19, 1775"],
    a: 0,
  },
  // Q64
  {
    q: "There were 13 original states. Name three.",
    o: [
      "Virginia, Massachusetts, and Pennsylvania",
      "Texas, California, and New York",
      "Ohio, Michigan, and Indiana",
      "Florida, Georgia, and Alabama",
    ],
    a: 0,
  },
  // Q65
  {
    q: "What happened at the Constitutional Convention?",
    o: [
      "The Constitution was written",
      "The Declaration of Independence was signed",
      "The Bill of Rights was ratified",
      "The United States declared war on Britain",
    ],
    a: 0,
  },
  // Q66
  {
    q: "When was the Constitution written?",
    o: ["1787", "1776", "1791", "1803"],
    a: 0,
  },
  // Q67
  {
    q: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
    o: ["James Madison", "Thomas Jefferson", "John Adams", "Patrick Henry"],
    a: 0,
  },
  // Q68
  {
    q: "What is one thing Benjamin Franklin is famous for?",
    o: [
      "U.S. diplomat and inventor",
      "First President of the United States",
      "Writing the Constitution",
      "Leading the Continental Army",
    ],
    a: 0,
  },
  // Q69
  {
    q: "Who is the 'Father of Our Country'?",
    o: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
    a: 0,
  },
  // Q70
  {
    q: "Who was the first President?",
    o: ["George Washington", "John Adams", "Thomas Jefferson", "James Madison"],
    a: 0,
  },

  // ── 1800s ─────────────────────────────────────────────────────────────────

  // Q71
  {
    q: "What territory did the United States buy from France in 1803?",
    o: ["The Louisiana Territory", "The Florida Territory", "The Texas Territory", "The Oregon Territory"],
    a: 0,
  },
  // Q72
  {
    q: "Name one war fought by the United States in the 1800s.",
    o: [
      "Civil War",
      "World War I",
      "World War II",
      "Korean War",
    ],
    a: 0,
  },
  // Q73
  {
    q: "Name the U.S. war between the North and the South.",
    o: ["The Civil War", "The Revolutionary War", "The War of 1812", "The Mexican-American War"],
    a: 0,
  },
  // Q74
  {
    q: "Name one problem that led to the Civil War.",
    o: [
      "Slavery",
      "Taxation without representation",
      "Manifest Destiny",
      "Foreign invasion",
    ],
    a: 0,
  },
  // Q75
  {
    q: "What was one important thing that Abraham Lincoln did?",
    o: [
      "Freed the slaves (Emancipation Proclamation)",
      "Wrote the Declaration of Independence",
      "Led the Continental Army",
      "Purchased the Louisiana Territory",
    ],
    a: 0,
  },
  // Q76
  {
    q: "What did the Emancipation Proclamation do?",
    o: [
      "Freed the slaves in Confederate states",
      "Ended the Civil War",
      "Gave women the right to vote",
      "Created the Thirteenth Amendment",
    ],
    a: 0,
  },
  // Q77
  {
    q: "What did Susan B. Anthony do?",
    o: [
      "Fought for women's rights",
      "Led the Underground Railroad",
      "Wrote the Emancipation Proclamation",
      "Founded the American Red Cross",
    ],
    a: 0,
  },

  // ── Recent American History ───────────────────────────────────────────────

  // Q78
  {
    q: "Name one war fought by the United States in the 1900s.",
    o: [
      "World War I",
      "The Civil War",
      "The Mexican-American War",
      "The War of 1812",
    ],
    a: 0,
  },
  // Q79
  {
    q: "Who was President during World War I?",
    o: ["Woodrow Wilson", "Theodore Roosevelt", "Franklin Roosevelt", "Warren Harding"],
    a: 0,
  },
  // Q80
  {
    q: "Who was President during the Great Depression and World War II?",
    o: ["Franklin Roosevelt", "Harry Truman", "Woodrow Wilson", "Herbert Hoover"],
    a: 0,
  },
  // Q81
  {
    q: "Who did the United States fight in World War II?",
    o: [
      "Japan, Germany, and Italy",
      "France, Britain, and Russia",
      "China, Korea, and Vietnam",
      "Spain, Portugal, and Austria",
    ],
    a: 0,
  },
  // Q82
  {
    q: "Before he was President, Eisenhower was a general. What war was he in?",
    o: ["World War II", "World War I", "Korean War", "Vietnam War"],
    a: 0,
  },
  // Q83
  {
    q: "During the Cold War, what was the main concern of the United States?",
    o: ["Communism", "Terrorism", "Nuclear disarmament", "Environmental destruction"],
    a: 0,
  },
  // Q84
  {
    q: "What movement tried to end racial discrimination?",
    o: [
      "The civil rights movement",
      "The suffrage movement",
      "The labor movement",
      "The temperance movement",
    ],
    a: 0,
  },
  // Q85
  {
    q: "What did Martin Luther King, Jr. do?",
    o: [
      "Fought for civil rights for all Americans",
      "Led the United States in World War II",
      "Wrote the Emancipation Proclamation",
      "Founded the NAACP",
    ],
    a: 0,
  },
  // Q86
  {
    q: "What major event happened on September 11, 2001, in the United States?",
    o: [
      "Terrorists attacked the United States",
      "The United States declared war on Iraq",
      "A major hurricane struck New York City",
      "The stock market crashed",
    ],
    a: 0,
  },
  // Q87
  {
    q: "Name one American Indian tribe in the United States.",
    o: [
      "Cherokee",
      "Aztec",
      "Inuit",
      "Sioux (answer varies — many accepted)",
    ],
    a: 0,
  },

  // ── Geography ─────────────────────────────────────────────────────────────

  // Q88
  {
    q: "Name one of the two longest rivers in the United States.",
    o: [
      "Missouri River",
      "Colorado River",
      "Ohio River",
      "Hudson River",
    ],
    a: 0,
  },
  // Q89
  {
    q: "What ocean is on the West Coast of the United States?",
    o: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    a: 0,
  },
  // Q90
  {
    q: "What ocean is on the East Coast of the United States?",
    o: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
    a: 0,
  },
  // Q91
  {
    q: "Name one U.S. territory.",
    o: ["Puerto Rico", "Bermuda", "Cuba", "Jamaica"],
    a: 0,
  },
  // Q92
  {
    q: "Name one state that borders Canada.",
    o: ["Montana", "Texas", "California", "Florida"],
    a: 0,
  },
  // Q93
  {
    q: "Name one state that borders Mexico.",
    o: ["Texas", "Nevada", "Louisiana", "Oklahoma"],
    a: 0,
  },
  // Q94
  {
    q: "What is the capital of the United States?",
    o: ["Washington, D.C.", "New York City", "Philadelphia", "Boston"],
    a: 0,
  },
  // Q95
  {
    q: "Where is the Statue of Liberty?",
    o: [
      "New York (Harbor) / New Jersey",
      "Washington, D.C.",
      "Philadelphia, Pennsylvania",
      "Boston, Massachusetts",
    ],
    a: 0,
  },

  // ── Symbols ───────────────────────────────────────────────────────────────

  // Q96
  {
    q: "Why does the flag have 13 stripes?",
    o: [
      "Because there were 13 original colonies",
      "Because there are 13 amendments in the Bill of Rights",
      "Because 13 states signed the Declaration of Independence",
      "Because the flag was designed by 13 founders",
    ],
    a: 0,
  },
  // Q97
  {
    q: "Why does the flag have 50 stars?",
    o: [
      "Because there is one star for each state",
      "Because there are 50 members in the Senate",
      "Because 50 states ratified the Constitution",
      "Because 50 battles were fought in the Revolution",
    ],
    a: 0,
  },
  // Q98
  {
    q: "What is the name of the national anthem?",
    o: [
      "The Star-Spangled Banner",
      "America the Beautiful",
      "My Country, 'Tis of Thee",
      "God Bless America",
    ],
    a: 0,
  },

  // ── Holidays ──────────────────────────────────────────────────────────────

  // Q99
  {
    q: "When do we celebrate Independence Day?",
    o: ["July 4", "June 14", "September 17", "November 11"],
    a: 0,
  },
  // Q100
  {
    q: "Name two national U.S. holidays.",
    o: [
      "Thanksgiving and Independence Day",
      "Valentine's Day and St. Patrick's Day",
      "Easter and Halloween",
      "Super Bowl Sunday and Labor Day",
    ],
    a: 0,
  },
];
