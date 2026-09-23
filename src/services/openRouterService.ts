import Config from 'react-native-config';

export const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const callOpenRouterModel = async (
  model: string,
  systemPrompt: string,
  userPrompt: string
): Promise<any> => {
  const apiKey = Config.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('API key is missing.');
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://airecipegenerator.com',
      'X-Title': 'AI Recipe Generator',
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Invalid response structure from model.');
  }

  return JSON.parse(data.choices[0].message.content);
};
