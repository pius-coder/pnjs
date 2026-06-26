import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import type { Convention } from "../types"

export async function generatePdf(conv: Convention, outputPath: string): Promise<void> {
  const doc = await PDFDocument.create()

  let font = await doc.embedFont(StandardFonts.Helvetica)
  let boldFont = await doc.embedFont(StandardFonts.HelveticaBold)

  const page = doc.addPage([595.28, 841.89])
  const { width, height } = page.getSize()

  let y = height - 50

  page.drawText("CONVENTION DE STAGE", {
    x: 50, y, size: 20, font: boldFont, color: rgb(0.1, 0.1, 0.4),
  })
  y -= 40
  page.drawText(`N° ${conv.id.slice(0, 8)}`, {
    x: 50, y, size: 12, font,
  })
  y -= 30

  const fields = [
    ["Statut", conv.statut],
    ["Date de debut", conv.date_debut || "N/A"],
    ["Date de fin", conv.date_fin || "N/A"],
    ["Missions", conv.missions || "N/A"],
    ["Gratification", conv.gratification || "N/A"],
  ]

  for (const [label, value] of fields) {
    page.drawText(`${label}:`, { x: 50, y, size: 11, font: boldFont })
    page.drawText(`${value}`, { x: 200, y, size: 11, font })
    y -= 20
  }

  y -= 20
  page.drawText("Validations:", { x: 50, y, size: 14, font: boldFont })
  y -= 25

  const validations = [
    ["Entreprise", conv.date_validation_entreprise],
    ["Candidat", conv.date_validation_candidat],
    ["Etablissement", conv.date_validation_etablissement],
  ]

  for (const [actor, date] of validations) {
    const status = date ? `Valide le ${date}` : "En attente"
    page.drawText(`${actor}: ${status}`, { x: 50, y, size: 11, font, color: date ? rgb(0, 0.5, 0) : rgb(0.5, 0, 0) })
    y -= 20
  }

  const pdfBytes = await doc.save()
  await Bun.write(outputPath, pdfBytes)
}
