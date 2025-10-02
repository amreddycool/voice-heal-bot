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

const diagnoses = {
  flu: {
    symptoms: ['fever', 'cough', 'headache', 'fatigue'],
    advice: "You may have the flu. I recommend rest, staying hydrated, and taking over-the-counter fever reducers. If symptoms worsen or persist beyond 7 days, please consult a healthcare provider."
  },
  cold: {
    symptoms: ['cough', 'soreThroat', 'headache'],
    advice: "Your symptoms suggest a common cold. Get plenty of rest, drink warm fluids, and consider using throat lozenges. Most colds resolve within 7-10 days. If symptoms worsen, consult a doctor."
  },
  stomachBug: {
    symptoms: ['nausea', 'fatigue', 'headache'],
    advice: "You might have a stomach bug or gastroenteritis. Stay hydrated with clear fluids, eat bland foods when you can, and rest. If symptoms persist beyond 48 hours or you show signs of dehydration, seek medical attention."
  },
  respiratory: {
    symptoms: ['cough', 'breathlessness', 'fever'],
    advice: "Your symptoms suggest a respiratory infection. Please seek medical attention soon for proper evaluation. In the meantime, rest and monitor your breathing. If breathing difficulties worsen, seek emergency care."
  }
};

export const getMedicalResponse = (userMessage: string, conversationHistory: ChatMessage[]): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Initial greeting
  if (conversationHistory.length === 0 || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm your AI Medical Assistant. I'm here to help you understand your symptoms. Please describe what symptoms you're experiencing, and I'll provide some preliminary guidance. Remember, this is not a substitute for professional medical advice.";
  }

  // Check for emergency keywords
  const emergencyKeywords = ['chest pain', 'can\'t breathe', 'severe pain', 'bleeding', 'unconscious', 'emergency'];
  if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return "⚠️ These symptoms sound serious. Please seek immediate medical attention by calling emergency services or going to the nearest emergency room. Do not delay.";
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
    return "I'd like to help you better. Could you please describe your symptoms in more detail? For example, are you experiencing fever, cough, headache, nausea, or any other specific symptoms?";
  }

  // Find matching diagnosis
  let bestMatch: { name: string; count: number; diagnosis: typeof diagnoses.flu } | null = null;
  
  Object.entries(diagnoses).forEach(([name, diagnosis]) => {
    const matchCount = diagnosis.symptoms.filter(s => detectedSymptoms.includes(s)).length;
    if (matchCount > 0 && (!bestMatch || matchCount > bestMatch.count)) {
      bestMatch = { name, count: matchCount, diagnosis };
    }
  });

  if (bestMatch) {
    return `Based on your symptoms (${detectedSymptoms.join(', ')}), ${bestMatch.diagnosis.advice}\n\n⚕️ Please note: This is a preliminary assessment. For accurate diagnosis and treatment, please consult with a qualified healthcare professional.`;
  }

  // Generic response if symptoms don't match a pattern
  return `I understand you're experiencing: ${detectedSymptoms.join(', ')}. While I can provide general information, these symptoms should be evaluated by a healthcare professional for an accurate diagnosis and appropriate treatment. If your symptoms are severe or worsening, please seek medical attention promptly.`;
};
