interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const symptoms = {
  fever: ['high temperature', 'fever', 'hot', 'burning up'],
  cough: ['cough', 'coughing', 'chest pain'],
  headache: ['headache', 'head pain', 'migraine'],
  soreThroat: ['sore throat', 'throat pain', 'swallowing pain'],
  fatigue: ['tired', 'fatigue', 'exhausted', 'weakness'],
  nausea: ['nausea', 'vomiting', 'sick', 'stomach'],
  breathlessness: ['breathless', 'breathing', 'shortness of breath', 'wheezing'],
};

const getDiagnoses = (t: any) => ({
  flu: {
    symptoms: ['fever', 'cough', 'headache', 'fatigue'],
    advice: t.flu
  },
  cold: {
    symptoms: ['cough', 'soreThroat', 'headache'],
    advice: t.cold
  },
  stomachBug: {
    symptoms: ['nausea', 'fatigue', 'headache'],
    advice: t.stomach
  },
  respiratory: {
    symptoms: ['cough', 'breathlessness', 'fever'],
    advice: t.respiratory
  }
});

const translations = {
  en: {
    greeting: "Hello! I'm your AI Medical Assistant. I'm here to help you understand your symptoms. Please describe what symptoms you're experiencing, and I'll provide some preliminary guidance. Remember, this is not a substitute for professional medical advice.",
    emergency: "⚠️ These symptoms sound serious. Please seek immediate medical attention by calling emergency services or going to the nearest emergency room. Do not delay.",
    askMore: "I'd like to help you better. Could you please describe your symptoms in more detail? For example, are you experiencing fever, cough, headache, nausea, or any other specific symptoms?",
    disclaimer: "⚕️ Please note: This is a preliminary assessment. For accurate diagnosis and treatment, please consult with a qualified healthcare professional.",
    flu: "You may have the flu. I recommend rest, staying hydrated, and taking over-the-counter fever reducers. If symptoms worsen or persist beyond 7 days, please consult a healthcare provider.",
    cold: "Your symptoms suggest a common cold. Get plenty of rest, drink warm fluids, and consider using throat lozenges. Most colds resolve within 7-10 days. If symptoms worsen, consult a doctor.",
    stomach: "You might have a stomach bug or gastroenteritis. Stay hydrated with clear fluids, eat bland foods when you can, and rest. If symptoms persist beyond 48 hours or you show signs of dehydration, seek medical attention.",
    respiratory: "Your symptoms suggest a respiratory infection. Please seek medical attention soon for proper evaluation. In the meantime, rest and monitor your breathing. If breathing difficulties worsen, seek emergency care.",
    generic: "While I can provide general information, these symptoms should be evaluated by a healthcare professional for an accurate diagnosis and appropriate treatment. If your symptoms are severe or worsening, please seek medical attention promptly."
  },
  es: {
    greeting: "¡Hola! Soy tu Asistente Médico de IA. Estoy aquí para ayudarte a entender tus síntomas. Por favor describe qué síntomas estás experimentando, y te proporcionaré orientación preliminar. Recuerda, esto no sustituye el consejo médico profesional.",
    emergency: "⚠️ Estos síntomas suenan graves. Por favor busca atención médica inmediata llamando a servicios de emergencia o yendo a la sala de emergencias más cercana. No te demores.",
    askMore: "Me gustaría ayudarte mejor. ¿Podrías describir tus síntomas con más detalle? Por ejemplo, ¿tienes fiebre, tos, dolor de cabeza, náuseas u otros síntomas específicos?",
    disclaimer: "⚕️ Nota: Esta es una evaluación preliminar. Para un diagnóstico preciso y tratamiento, por favor consulta con un profesional de la salud calificado.",
    flu: "Puede que tengas gripe. Recomiendo descanso, mantenerte hidratado y tomar medicamentos de venta libre para bajar la fiebre. Si los síntomas empeoran o persisten más de 7 días, consulta a un proveedor de atención médica.",
    cold: "Tus síntomas sugieren un resfriado común. Descansa mucho, bebe líquidos calientes y considera usar pastillas para la garganta. La mayoría de los resfriados se resuelven en 7-10 días. Si los síntomas empeoran, consulta a un médico.",
    stomach: "Podrías tener un virus estomacal o gastroenteritis. Mantente hidratado con líquidos claros, come alimentos suaves cuando puedas y descansa. Si los síntomas persisten más de 48 horas o muestras signos de deshidratación, busca atención médica.",
    respiratory: "Tus síntomas sugieren una infección respiratoria. Busca atención médica pronto para una evaluación adecuada. Mientras tanto, descansa y monitorea tu respiración. Si las dificultades respiratorias empeoran, busca atención de emergencia.",
    generic: "Aunque puedo proporcionar información general, estos síntomas deben ser evaluados por un profesional de la salud para un diagnóstico preciso y tratamiento apropiado. Si tus síntomas son graves o están empeorando, busca atención médica de inmediato."
  },
  fr: {
    greeting: "Bonjour! Je suis votre Assistant Médical IA. Je suis là pour vous aider à comprendre vos symptômes. Veuillez décrire les symptômes que vous ressentez, et je vous fournirai des conseils préliminaires. N'oubliez pas, ceci ne remplace pas les conseils médicaux professionnels.",
    emergency: "⚠️ Ces symptômes semblent graves. Veuillez consulter immédiatement un médecin en appelant les services d'urgence ou en vous rendant aux urgences les plus proches. Ne tardez pas.",
    askMore: "J'aimerais mieux vous aider. Pourriez-vous décrire vos symptômes plus en détail? Par exemple, avez-vous de la fièvre, de la toux, des maux de tête, des nausées ou d'autres symptômes spécifiques?",
    disclaimer: "⚕️ Veuillez noter: Ceci est une évaluation préliminaire. Pour un diagnostic précis et un traitement, veuillez consulter un professionnel de santé qualifié.",
    flu: "Vous pourriez avoir la grippe. Je recommande du repos, de rester hydraté et de prendre des médicaments en vente libre pour réduire la fièvre. Si les symptômes s'aggravent ou persistent au-delà de 7 jours, consultez un professionnel de santé.",
    cold: "Vos symptômes suggèrent un rhume commun. Reposez-vous bien, buvez des liquides chauds et envisagez d'utiliser des pastilles pour la gorge. La plupart des rhumes se résolvent en 7-10 jours. Si les symptômes s'aggravent, consultez un médecin.",
    stomach: "Vous pourriez avoir une gastro-entérite. Restez hydraté avec des liquides clairs, mangez des aliments fades quand vous le pouvez et reposez-vous. Si les symptômes persistent au-delà de 48 heures ou si vous montrez des signes de déshydratation, consultez un médecin.",
    respiratory: "Vos symptômes suggèrent une infection respiratoire. Consultez bientôt un médecin pour une évaluation appropriée. En attendant, reposez-vous et surveillez votre respiration. Si les difficultés respiratoires s'aggravent, consultez les urgences.",
    generic: "Bien que je puisse fournir des informations générales, ces symptômes doivent être évalués par un professionnel de santé pour un diagnostic précis et un traitement approprié. Si vos symptômes sont graves ou s'aggravent, consultez immédiatement un médecin."
  },
  de: {
    greeting: "Hallo! Ich bin Ihr medizinischer KI-Assistent. Ich bin hier, um Ihnen zu helfen, Ihre Symptome zu verstehen. Bitte beschreiben Sie, welche Symptome Sie haben, und ich werde Ihnen vorläufige Hinweise geben. Denken Sie daran, dies ist kein Ersatz für professionelle medizinische Beratung.",
    emergency: "⚠️ Diese Symptome klingen ernst. Bitte suchen Sie sofort medizinische Hilfe auf, indem Sie den Notdienst anrufen oder zur nächsten Notaufnahme gehen. Zögern Sie nicht.",
    askMore: "Ich möchte Ihnen besser helfen. Könnten Sie Ihre Symptome bitte detaillierter beschreiben? Haben Sie zum Beispiel Fieber, Husten, Kopfschmerzen, Übelkeit oder andere spezifische Symptome?",
    disclaimer: "⚕️ Bitte beachten: Dies ist eine vorläufige Einschätzung. Für eine genaue Diagnose und Behandlung konsultieren Sie bitte einen qualifizierten medizinischen Fachmann.",
    flu: "Sie könnten die Grippe haben. Ich empfehle Ruhe, viel Flüssigkeit und rezeptfreie Fiebersenker. Wenn sich die Symptome verschlechtern oder länger als 7 Tage anhalten, konsultieren Sie bitte einen Arzt.",
    cold: "Ihre Symptome deuten auf eine Erkältung hin. Ruhen Sie sich gut aus, trinken Sie warme Flüssigkeiten und erwägen Sie Halspastillen. Die meisten Erkältungen verschwinden innerhalb von 7-10 Tagen. Wenn sich die Symptome verschlechtern, konsultieren Sie einen Arzt.",
    stomach: "Sie könnten einen Magen-Darm-Infekt haben. Bleiben Sie mit klaren Flüssigkeiten hydratisiert, essen Sie milde Nahrung wenn möglich und ruhen Sie sich aus. Wenn die Symptome länger als 48 Stunden anhalten oder Sie Anzeichen von Dehydrierung zeigen, suchen Sie medizinische Hilfe auf.",
    respiratory: "Ihre Symptome deuten auf eine Atemwegsinfektion hin. Bitte suchen Sie bald einen Arzt für eine ordentliche Untersuchung auf. Ruhen Sie sich in der Zwischenzeit aus und überwachen Sie Ihre Atmung. Wenn sich Atembeschwerden verschlechtern, suchen Sie die Notaufnahme auf.",
    generic: "Obwohl ich allgemeine Informationen geben kann, sollten diese Symptome von einem medizinischen Fachmann für eine genaue Diagnose und angemessene Behandlung bewertet werden. Wenn Ihre Symptome schwerwiegend sind oder sich verschlechtern, suchen Sie sofort medizinische Hilfe auf."
  },
  zh: {
    greeting: "你好！我是你的AI医疗助手。我在这里帮助你了解你的症状。请描述你正在经历的症状，我会提供初步指导。请记住，这不能替代专业医疗建议。",
    emergency: "⚠️ 这些症状听起来很严重。请立即拨打急救电话或前往最近的急诊室寻求医疗帮助。不要延误。",
    askMore: "我想更好地帮助你。你能更详细地描述你的症状吗？例如，你是否有发烧、咳嗽、头痛、恶心或其他特定症状？",
    disclaimer: "⚕️ 请注意：这是初步评估。要获得准确的诊断和治疗，请咨询合格的医疗专业人员。",
    flu: "你可能患有流感。我建议休息，保持水分充足，服用非处方退烧药。如果症状恶化或持续超过7天，请咨询医疗提供者。",
    cold: "你的症状表明是普通感冒。好好休息，喝温热的液体，考虑使用润喉糖。大多数感冒会在7-10天内痊愈。如果症状恶化，请咨询医生。",
    stomach: "你可能有胃肠炎。保持水分充足，可以的话吃清淡食物，多休息。如果症状持续超过48小时或出现脱水迹象，请就医。",
    respiratory: "你的症状表明有呼吸道感染。请尽快就医进行适当评估。同时，注意休息并监测呼吸情况。如果呼吸困难加重，请寻求急救。",
    generic: "虽然我可以提供一般信息，但这些症状应由医疗专业人员评估以获得准确诊断和适当治疗。如果症状严重或恶化，请立即就医。"
  },
  sw: {
    greeting: "Habari! Mimi ni Msaidizi wako wa Kimatibabu wa AI. Niko hapa kukusaidia kuelewa dalili zako. Tafadhali eleza dalili unazopata, na nitakupa mwongozo wa awali. Kumbuka, hii sio mbadala wa ushauri wa kimatibabu wa kitaalamu.",
    emergency: "⚠️ Dalili hizi zinaonekana kuwa mbaya. Tafadhali tafuta msaada wa haraka kwa kupiga simu ya dharura au kwenda hospitali ya dharura iliyo karibu. Usisite.",
    askMore: "Ningependa kukusaidia vizuri zaidi. Je, unaweza kueleza dalili zako kwa undani zaidi? Kwa mfano, je, una homa, kikohozi, maumivu ya kichwa, kichefuchefu, au dalili zingine maalum?",
    disclaimer: "⚕️ Tafadhali kumbuka: Hii ni tathmini ya awali. Kwa uchunguzi sahihi na matibabu, tafadhali wasiliana na mtaalamu wa afya aliye na sifa.",
    flu: "Unaweza kuwa na homa ya mafua. Napendekeza kupumzika, kunywa maji mengi, na kutumia dawa za kupunguza homa zinazouzwa bila dawa ya daktari. Ikiwa dalili zinaendelea kuwa mbaya au kudumu zaidi ya siku 7, tafadhali wasiliana na mtoa huduma za afya.",
    cold: "Dalili zako zinaonyesha homa ya kawaida. Pumzika vizuri, nywa vinywaji vya moto, na fikiria kutumia vidonge vya koo. Homa nyingi huisha ndani ya siku 7-10. Ikiwa dalili zinaendelea kuwa mbaya, wasiliana na daktari.",
    stomach: "Unaweza kuwa na mdudu wa tumbo au gastroenteritis. Endelea kunywa maji, kula chakula cha kawaida unapoweza, na pumzika. Ikiwa dalili zinaendelea zaidi ya masaa 48 au unaonyesha dalili za ukosefu wa maji mwilini, tafuta msaada wa kimatibabu.",
    respiratory: "Dalili zako zinaonyesha maambukizo ya njia ya kupumua. Tafadhali tafuta msaada wa kimatibabu hivi karibuni kwa tathmini sahihi. Wakati huo, pumzika na fuatilia upumuaji wako. Ikiwa ugumu wa kupumua unaendelea kuwa mbaya, tafuta msaada wa dharura.",
    generic: "Ingawa ninaweza kutoa taarifa za jumla, dalili hizi zinapaswa kutathminiwa na mtaalamu wa afya kwa uchunguzi sahihi na matibabu sahihi. Ikiwa dalili zako ni mbaya au zinaendelea kuwa mbaya, tafuta msaada wa kimatibabu mara moja."
  }
};

export const getMedicalResponse = (userMessage: string, conversationHistory: ChatMessage[], language: string = 'en'): string => {
  const t = translations[language as keyof typeof translations] || translations.en;
  const lowerMessage = userMessage.toLowerCase();
  
  // Initial greeting
  if (conversationHistory.length === 0 || lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hola') || lowerMessage.includes('bonjour') || lowerMessage.includes('hallo') || lowerMessage.includes('你好')) {
    return t.greeting;
  }

  // Check for emergency keywords
  const emergencyKeywords = ['chest pain', 'can\'t breathe', 'severe pain', 'bleeding', 'unconscious', 'emergency'];
  if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return t.emergency;
  }

  // Detect symptoms from message
  const detectedSymptoms: string[] = [];
  Object.entries(symptoms).forEach(([key, keywords]) => {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      detectedSymptoms.push(key);
    }
  });

  // If no symptoms detected, ask for more information
  if (detectedSymptoms.length === 0) {
    return t.askMore;
  }

  // Find matching diagnosis
  const diagnoses = getDiagnoses(t);
  let bestMatch: { name: string; count: number; diagnosis: typeof diagnoses.flu } | null = null;
  
  Object.entries(diagnoses).forEach(([name, diagnosis]) => {
    const matchCount = diagnosis.symptoms.filter(s => detectedSymptoms.includes(s)).length;
    if (matchCount > 0 && (!bestMatch || matchCount > bestMatch.count)) {
      bestMatch = { name, count: matchCount, diagnosis };
    }
  });

  if (bestMatch) {
    return `${bestMatch.diagnosis.advice}\n\n${t.disclaimer}`;
  }

  // Generic response if symptoms don't match a pattern
  return `${t.generic}`;
};
