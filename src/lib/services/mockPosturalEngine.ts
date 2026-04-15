import type { AnalysisResult, ViewType } from '@/lib/types/analysis'

// Mocks the backend MedaPipe + Heuristic Engine processing
export async function processPhotos(
  photos: Record<ViewType, string | null>,
): Promise<AnalysisResult> {
  // Simulate network & AI processing delay (3-5 seconds)
  await new Promise((resolve) => setTimeout(resolve, 3500))

  // In a real app, this would send photos to the backend, check rate limits,
  // run the MediaPipe models, calculate dot products, and return actual data.
  // Here we return a deterministic mock based on realistic expected outputs.

  const mockScore = 68 // Moderate

  return {
    score: mockScore,
    category: 'Moderate',
    riskLevel: 'Medium',
    requiresMedicalClearance: false,
    angles: {
      forwardHeadAngle: 42.5,
      thoracicKyphosisAngle: 55.2,
      lumbarLordosisAngle: 38.1,
      pelvicTiltAngle: 18.4,
    },
    deviations: [
      {
        id: 'dev-1',
        name: 'Anteriorização da Cabeça',
        severity: 'Moderate',
        confidence: 0.92,
        reference: 'Kendall et al. (2005) - Muscles: Testing and Function with Posture and Pain',
        recommendations: [
          'Alongamento de peitoral menor e ECOM',
          'Fortalecimento de flexores profundos do pescoço (chin tucks)',
        ],
      },
      {
        id: 'dev-2',
        name: 'Cifose Torácica Aumentada',
        severity: 'Mild',
        confidence: 0.88,
        reference: 'Sahrmann (2002) - Diagnosis and Treatment of Movement Impairment Syndromes',
        recommendations: [
          'Mobilidade torácica em extensão (foam roller)',
          'Fortalecimento de romboides e trapézio inferior',
        ],
      },
      {
        id: 'dev-3',
        name: 'Anteversão Pélvica',
        severity: 'Moderate',
        confidence: 0.95,
        reference: 'McGill (2015) - Back Mechanic',
        recommendations: [
          'Alongamento de flexores de quadril (psoas e reto femoral)',
          'Fortalecimento de glúteos e abdômen (core)',
        ],
      },
    ],
  }
}
