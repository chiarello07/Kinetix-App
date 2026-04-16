export type ViewType = 'FRONTAL' | 'LATERAL_LEFT' | 'LATERAL_RIGHT' | 'POSTERIOR'

export type Severity = 'Mild' | 'Moderate' | 'Severe'
export type RiskLevel = 'Low' | 'Medium' | 'High'
export type ScoreCategory = 'Excellent' | 'Good' | 'Moderate' | 'Poor' | 'Very Poor'

export interface PosturalDeviation {
  id: string
  name: string
  severity: Severity
  confidence: number
  reference: string
  recommendations: string[]
}

export interface AnalysisResult {
  id: string
  score: number
  category: ScoreCategory
  riskLevel: RiskLevel
  requiresMedicalClearance: boolean
  deviations: PosturalDeviation[]
  angles: Record<string, number>
}

export type AnalysisStep = 'CONSENT' | 'CAPTURE' | 'PROCESSING' | 'RESULTS' | 'ERROR'
