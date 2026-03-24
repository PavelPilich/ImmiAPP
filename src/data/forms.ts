import type { USCISForm } from '../types';

export const COUNTRIES: string[] = ["Afghanistan","Argentina","Australia","Bangladesh","Brazil","Cambodia","Cameroon","Canada","Chile","China","Colombia","Cuba","Dominican Republic","Ecuador","Egypt","El Salvador","Ethiopia","France","Germany","Ghana","Greece","Guatemala","Haiti","Honduras","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kenya","Laos","Lebanon","Liberia","Libya","Mexico","Myanmar","Nepal","Netherlands","Nicaragua","Nigeria","North Korea","Pakistan","Peru","Philippines","Poland","Romania","Russia","Saudi Arabia","Sierra Leone","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Sweden","Switzerland","Syria","Taiwan","Thailand","Turkey","Uganda","Ukraine","United Kingdom","United States","Uruguay","Venezuela","Vietnam","Yemen","Zimbabwe"];

export const TPS_COUNTRIES: string[] = ["Afghanistan","Cameroon","El Salvador","Ethiopia","Haiti","Honduras","Myanmar","Nepal","Nicaragua","Somalia","South Sudan","Sudan","Syria","Ukraine","Venezuela","Yemen"];

export const OPTIONAL_FIELDS: string[] = ["ssn","aNumber","i94","address","middleName","passportNum","passportExp","otherNames","heightFt","heightIn","eyeColor","hairColor","cityOfBirth","stateOfBirth","currentStatus","employerName","employerAddress","jobTitle","annualIncome","spouseName","spouseDob","childrenNames","motherName","fatherName","priorEAD","cardNumber","cardExpDate","replaceReason","marriageDate","marriageCity","jointAccounts","sharedProperty","dependentNames","companyName","companyAddress","ein","positionTitle","wageOffered","startDate","endDate","doctorName","doctorAddress","vaccinations","examDate","basisOfClaim","extremeHardship","benefitType"];

export const FORMS: USCISForm[] = [
  // ═══ EXISTING FORMS (EXPANDED) ═══

  { id:"i821", name:"I-821", desc:"goalTPS", tier:"simple", fee:199.99, uscis:510, sections:5, fieldCount:25, time:"6-12", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"otherNames",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:0,k:"cityOfBirth",t:"text"},
    {s:1,k:"aNumber",t:"text"},{s:1,k:"ssn",t:"text"},{s:1,k:"passportNum",t:"text"},{s:1,k:"passportExp",t:"date"},{s:1,k:"currentStatus",t:"text"},
    {s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"},{s:2,k:"entryDate",t:"date"},{s:2,k:"i94",t:"text"},{s:2,k:"tpsCountry",t:"tps"},
    {s:3,k:"gender",t:"select",opts:["male","female"]},{s:3,k:"maritalStatus",t:"select",opts:["single","married","divorced","widowed"]},{s:3,k:"spouseName",t:"text"},{s:3,k:"childrenNames",t:"text"},
    {s:4,k:"employerName",t:"text"},{s:4,k:"criminalHistory",t:"select",opts:["no","yes"]},{s:4,k:"travelHistory",t:"text"}
  ]},

  { id:"daca", name:"DACA", desc:"goalDACA", tier:"simple", fee:199.99, uscis:410, sections:4, fieldCount:20, time:"4-8", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"otherNames",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},
    {s:1,k:"aNumber",t:"text"},{s:1,k:"ssn",t:"text"},{s:1,k:"passportNum",t:"text"},{s:1,k:"currentStatus",t:"text"},
    {s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"},{s:2,k:"entryDate",t:"date"},{s:2,k:"continuousResidence",t:"text"},
    {s:3,k:"motherName",t:"text"},{s:3,k:"fatherName",t:"text"},{s:3,k:"schoolHistory",t:"text"},{s:3,k:"employerName",t:"text"},{s:3,k:"criminalHistory",t:"select",opts:["no","yes"]}
  ]},

  { id:"i765", name:"I-765", desc:"goalEAD", tier:"simple", fee:199.99, uscis:560, sections:3, fieldCount:18, time:"3-6", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"otherNames",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},
    {s:1,k:"aNumber",t:"text"},{s:1,k:"ssn",t:"text"},{s:1,k:"passportNum",t:"text"},{s:1,k:"currentStatus",t:"text"},{s:1,k:"eligCategory",t:"text"},{s:1,k:"priorEAD",t:"text"},
    {s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"},{s:2,k:"employerName",t:"text"},{s:2,k:"jobTitle",t:"text"},{s:2,k:"criminalHistory",t:"select",opts:["no","yes"]}
  ]},

  { id:"i130", name:"I-130", desc:"goalFamily", tier:"medium", fee:299.99, uscis:535, sections:4, fieldCount:25, time:"12-24", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:0,k:"ssn",t:"text"},
    {s:1,k:"petitionerName",t:"text"},{s:1,k:"petitionerCitizenship",t:"text"},{s:1,k:"relationship",t:"select",opts:["spouse","parent","child","sibling"]},{s:1,k:"marriageDate",t:"date"},{s:1,k:"marriageCity",t:"text"},
    {s:2,k:"passportNum",t:"text"},{s:2,k:"passportExp",t:"date"},{s:2,k:"beneficiaryStatus",t:"text"},{s:2,k:"spouseName",t:"text"},{s:2,k:"spouseDob",t:"date"},{s:2,k:"childrenNames",t:"text"},
    {s:3,k:"address",t:"text"},{s:3,k:"phone",t:"tel"},{s:3,k:"email",t:"email"},{s:3,k:"employerName",t:"text"},{s:3,k:"annualIncome",t:"text"},{s:3,k:"residenceHistory",t:"text"},{s:3,k:"priorMarriages",t:"text"},{s:3,k:"criminalHistory",t:"select",opts:["no","yes"]}
  ]},

  { id:"n400", name:"N-400", desc:"goalCitizen", tier:"medium", fee:299.99, uscis:760, sections:5, fieldCount:35, time:"8-14", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"otherNames",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:0,k:"cityOfBirth",t:"text"},
    {s:1,k:"aNumber",t:"text"},{s:1,k:"ssn",t:"text"},{s:1,k:"passportNum",t:"text"},{s:1,k:"passportExp",t:"date"},{s:1,k:"currentStatus",t:"text"},{s:1,k:"yearsResident",t:"text"},{s:1,k:"entryDate",t:"date"},
    {s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"},{s:2,k:"residenceHistory",t:"text"},{s:2,k:"employmentHistory",t:"text"},{s:2,k:"educationHistory",t:"text"},
    {s:3,k:"maritalStatus",t:"select",opts:["single","married","divorced","widowed"]},{s:3,k:"spouseName",t:"text"},{s:3,k:"spouseDob",t:"date"},{s:3,k:"childrenNames",t:"text"},{s:3,k:"motherName",t:"text"},{s:3,k:"fatherName",t:"text"},
    {s:4,k:"tripsOutsideUS",t:"text"},{s:4,k:"militaryService",t:"select",opts:["no","yes"]},{s:4,k:"criminalHistory",t:"select",opts:["no","yes"]},{s:4,k:"taxRecords",t:"select",opts:["no","yes"]},{s:4,k:"gender",t:"select",opts:["male","female"]},{s:4,k:"heightFt",t:"text"},{s:4,k:"heightIn",t:"text"},{s:4,k:"eyeColor",t:"text"},{s:4,k:"hairColor",t:"text"}
  ]},

  { id:"i485", name:"I-485", desc:"goalGreen", tier:"complex", fee:399.99, uscis:1440, sections:5, fieldCount:30, time:"12-36", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"otherNames",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:0,k:"cityOfBirth",t:"text"},
    {s:1,k:"aNumber",t:"text"},{s:1,k:"ssn",t:"text"},{s:1,k:"passportNum",t:"text"},{s:1,k:"passportExp",t:"date"},{s:1,k:"currentStatus",t:"text"},{s:1,k:"eligCategory",t:"text"},{s:1,k:"entryDate",t:"date"},
    {s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"},{s:2,k:"residenceHistory",t:"text"},{s:2,k:"employmentHistory",t:"text"},
    {s:3,k:"gender",t:"select",opts:["male","female"]},{s:3,k:"maritalStatus",t:"select",opts:["single","married","divorced","widowed"]},{s:3,k:"spouseName",t:"text"},{s:3,k:"childrenNames",t:"text"},{s:3,k:"motherName",t:"text"},{s:3,k:"fatherName",t:"text"},
    {s:4,k:"heightFt",t:"text"},{s:4,k:"eyeColor",t:"text"},{s:4,k:"hairColor",t:"text"},{s:4,k:"criminalHistory",t:"select",opts:["no","yes"]},{s:4,k:"immigrationViolations",t:"select",opts:["no","yes"]}
  ]},

  { id:"i131", name:"I-131", desc:"goalTravel", tier:"medium", fee:299.99, uscis:640, sections:3, fieldCount:18, time:"3-6", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:0,k:"aNumber",t:"text"},
    {s:1,k:"passportNum",t:"text"},{s:1,k:"passportExp",t:"date"},{s:1,k:"currentStatus",t:"text"},{s:1,k:"travelPurpose",t:"text"},{s:1,k:"destinations",t:"text"},{s:1,k:"departureDate",t:"date"},{s:1,k:"returnDate",t:"date"},
    {s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"},{s:2,k:"employerName",t:"text"},{s:2,k:"priorTravelDocs",t:"text"}
  ]},

  { id:"i589", name:"I-589", desc:"goalAsylum", tier:"complex", fee:399.99, uscis:0, sections:4, fieldCount:25, time:"6-24", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"otherNames",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:0,k:"cityOfBirth",t:"text"},
    {s:1,k:"passportNum",t:"text"},{s:1,k:"currentStatus",t:"text"},{s:1,k:"entryDate",t:"date"},{s:1,k:"i94",t:"text"},{s:1,k:"address",t:"text"},{s:1,k:"phone",t:"tel"},{s:1,k:"email",t:"email"},
    {s:2,k:"persecutionCountry",t:"country"},{s:2,k:"persecutionBasis",t:"select",opts:["race","religion","nationality","politicalOpinion","socialGroup"]},{s:2,k:"persecutionNarrative",t:"text"},{s:2,k:"persecutorNames",t:"text"},{s:2,k:"fearOfReturn",t:"text"},
    {s:3,k:"spouseName",t:"text"},{s:3,k:"childrenNames",t:"text"},{s:3,k:"familyAsylumStatus",t:"text"},{s:3,k:"priorApplications",t:"select",opts:["no","yes"]},{s:3,k:"criminalHistory",t:"select",opts:["no","yes"]},{s:3,k:"immigrationViolations",t:"select",opts:["no","yes"]}
  ]},

  // ═══ NEW FORMS ═══

  { id:"i539", name:"I-539", desc:"goalVisitor", tier:"medium", fee:299.99, uscis:370, sections:3, fieldCount:15, time:"3-6", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:0,k:"passportNum",t:"text"},
    {s:1,k:"currentStatus",t:"text"},{s:1,k:"i94",t:"text"},{s:1,k:"entryDate",t:"date"},{s:1,k:"statusExpDate",t:"date"},{s:1,k:"extensionReason",t:"text"},
    {s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"},{s:2,k:"departurePlan",t:"text"}
  ]},

  { id:"i129f", name:"I-129F", desc:"goalFiance", tier:"vcomplex", fee:499.99, uscis:535, sections:4, fieldCount:20, time:"6-12", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"ssn",t:"text"},{s:0,k:"address",t:"text"},
    {s:1,k:"petitionerCitizenship",t:"text"},{s:1,k:"maritalStatus",t:"select",opts:["single","divorced","widowed"]},{s:1,k:"priorMarriages",t:"text"},
    {s:2,k:"beneficiaryFirstName",t:"text"},{s:2,k:"beneficiaryLastName",t:"text"},{s:2,k:"beneficiaryDob",t:"date"},{s:2,k:"beneficiaryCountry",t:"country"},{s:2,k:"beneficiaryAddress",t:"text"},{s:2,k:"beneficiaryPassport",t:"text"},
    {s:3,k:"howMet",t:"text"},{s:3,k:"metInPerson",t:"select",opts:["yes","no"]},{s:3,k:"meetingDates",t:"text"},{s:3,k:"weddingPlan",t:"text"},{s:3,k:"criminalHistory",t:"select",opts:["no","yes"]}
  ]},

  { id:"i90", name:"I-90", desc:"goalRenewGC", tier:"simple", fee:199.99, uscis:455, sections:2, fieldCount:12, time:"6-12", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:0,k:"aNumber",t:"text"},
    {s:1,k:"gcCardNumber",t:"text"},{s:1,k:"cardExpDate",t:"date"},{s:1,k:"replaceReason",t:"select",opts:["expired","lost","stolen","damaged","nameChange","other"]},{s:1,k:"address",t:"text"},{s:1,k:"phone",t:"tel"},{s:1,k:"email",t:"email"}
  ]},

  { id:"i751", name:"I-751", desc:"goalRemoveConditions", tier:"medium", fee:299.99, uscis:595, sections:3, fieldCount:15, time:"12-24", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"aNumber",t:"text"},{s:0,k:"ssn",t:"text"},
    {s:1,k:"marriageDate",t:"date"},{s:1,k:"marriageCity",t:"text"},{s:1,k:"spouseName",t:"text"},{s:1,k:"spouseDob",t:"date"},{s:1,k:"address",t:"text"},
    {s:2,k:"jointAccounts",t:"select",opts:["yes","no"]},{s:2,k:"sharedProperty",t:"select",opts:["yes","no"]},{s:2,k:"childrenNames",t:"text"},{s:2,k:"criminalHistory",t:"select",opts:["no","yes"]}
  ]},

  { id:"i864", name:"I-864", desc:"goalAffidavit", tier:"medium", fee:299.99, uscis:0, sections:3, fieldCount:18, time:"0-1", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"ssn",t:"text"},{s:0,k:"address",t:"text"},
    {s:1,k:"employerName",t:"text"},{s:1,k:"jobTitle",t:"text"},{s:1,k:"annualIncome",t:"text"},{s:1,k:"incomeYear1",t:"text"},{s:1,k:"incomeYear2",t:"text"},{s:1,k:"incomeYear3",t:"text"},
    {s:2,k:"householdSize",t:"text"},{s:2,k:"dependentNames",t:"text"},{s:2,k:"assets",t:"text"},{s:2,k:"relationship",t:"text"},{s:2,k:"petitionerCitizenship",t:"text"},{s:2,k:"phone",t:"tel"}
  ]},

  { id:"i129", name:"I-129", desc:"goalWorker", tier:"complex", fee:399.99, uscis:460, sections:4, fieldCount:22, time:"3-6", fields:[
    {s:0,k:"companyName",t:"text"},{s:0,k:"companyAddress",t:"text"},{s:0,k:"ein",t:"text"},{s:0,k:"phone",t:"tel"},{s:0,k:"email",t:"email"},
    {s:1,k:"firstName",t:"text"},{s:1,k:"middleName",t:"text"},{s:1,k:"lastName",t:"text"},{s:1,k:"dob",t:"date"},{s:1,k:"country",t:"country"},{s:1,k:"passportNum",t:"text"},
    {s:2,k:"positionTitle",t:"text"},{s:2,k:"jobTitle",t:"text"},{s:2,k:"wageOffered",t:"text"},{s:2,k:"startDate",t:"date"},{s:2,k:"endDate",t:"date"},{s:2,k:"workAddress",t:"text"},
    {s:3,k:"educationHistory",t:"text"},{s:3,k:"employmentHistory",t:"text"},{s:3,k:"visaCategory",t:"select",opts:["H-1B","L-1","O-1","P-1","TN","E-1","E-2"]},{s:3,k:"currentStatus",t:"text"},{s:3,k:"criminalHistory",t:"select",opts:["no","yes"]}
  ]},

  { id:"i140", name:"I-140", desc:"goalEmployerGC", tier:"complex", fee:399.99, uscis:700, sections:4, fieldCount:20, time:"6-12", fields:[
    {s:0,k:"companyName",t:"text"},{s:0,k:"companyAddress",t:"text"},{s:0,k:"ein",t:"text"},{s:0,k:"annualIncome",t:"text"},{s:0,k:"employeeCount",t:"text"},
    {s:1,k:"firstName",t:"text"},{s:1,k:"middleName",t:"text"},{s:1,k:"lastName",t:"text"},{s:1,k:"dob",t:"date"},{s:1,k:"country",t:"country"},{s:1,k:"passportNum",t:"text"},
    {s:2,k:"positionTitle",t:"text"},{s:2,k:"wageOffered",t:"text"},{s:2,k:"eligCategory",t:"select",opts:["EB-1A","EB-1B","EB-1C","EB-2","EB-3","EB-4","EB-5"]},{s:2,k:"educationHistory",t:"text"},
    {s:3,k:"employmentHistory",t:"text"},{s:3,k:"address",t:"text"},{s:3,k:"phone",t:"tel"},{s:3,k:"email",t:"email"},{s:3,k:"criminalHistory",t:"select",opts:["no","yes"]}
  ]},

  { id:"i693", name:"I-693", desc:"goalMedical", tier:"simple", fee:199.99, uscis:0, sections:2, fieldCount:10, time:"0-1", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"aNumber",t:"text"},{s:0,k:"address",t:"text"},
    {s:1,k:"doctorName",t:"text"},{s:1,k:"doctorAddress",t:"text"},{s:1,k:"vaccinations",t:"text"},{s:1,k:"examDate",t:"date"}
  ]},

  { id:"i912", name:"I-912", desc:"goalFeeWaiver", tier:"simple", fee:199.99, uscis:0, sections:2, fieldCount:12, time:"1-2", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"aNumber",t:"text"},{s:0,k:"address",t:"text"},
    {s:1,k:"annualIncome",t:"text"},{s:1,k:"householdSize",t:"text"},{s:1,k:"benefitType",t:"select",opts:["medicaid","snap","ssi","tanf","other"]},{s:1,k:"employerName",t:"text"},{s:1,k:"phone",t:"tel"},{s:1,k:"email",t:"email"}
  ]},

  { id:"i601", name:"I-601", desc:"goalWaiver", tier:"complex", fee:399.99, uscis:930, sections:3, fieldCount:15, time:"6-12", fields:[
    {s:0,k:"firstName",t:"text"},{s:0,k:"middleName",t:"text"},{s:0,k:"lastName",t:"text"},{s:0,k:"dob",t:"date"},{s:0,k:"country",t:"country"},{s:0,k:"aNumber",t:"text"},
    {s:1,k:"basisOfClaim",t:"text"},{s:1,k:"extremeHardship",t:"text"},{s:1,k:"qualifyingRelative",t:"text"},{s:1,k:"relationshipToApplicant",t:"text"},
    {s:2,k:"address",t:"text"},{s:2,k:"phone",t:"tel"},{s:2,k:"email",t:"email"},{s:2,k:"employerName",t:"text"},{s:2,k:"criminalHistory",t:"select",opts:["no","yes"]}
  ]},
];
