// /api/get-review.js
import { json } from 'micro'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  systemInstruction: `...your long instruction text...`
})

async function generateContent(prompt) {
  const result = await model.generateContent(prompt)
  return result.response.text()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST allowed' })
    return
  }
  const { code } = await json(req)
  if (!code) {
    res.status(400).json({ message: 'Code is required' })
    return
  }
  try {
    const review = await generateContent(code)
    res.status(200).json({ review })
  } catch (err) {
    res.status(500).json({ message: 'AI error', error: err.message })
  }
}
