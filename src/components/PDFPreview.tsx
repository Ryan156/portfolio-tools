import { useEffect, useRef } from "react"

import {
    getDocument,
    GlobalWorkerOptions,
} from "pdfjs-dist"

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url"


GlobalWorkerOptions.workerSrc = workerSrc


interface PDFPreviewProps {
    file: File
}


function PDFPreview({
    file,
}: PDFPreviewProps) {

    const canvasRef =
        useRef<HTMLCanvasElement>(null)


    useEffect(() => {

        let cancelled = false

        async function renderPDF() {

            try {

                const arrayBuffer =
                    await file.arrayBuffer()

                const pdf =
                    await getDocument({
                        data: arrayBuffer,
                    }).promise

                const page =
                    await pdf.getPage(1)

                const viewport =
                    page.getViewport({
                        scale: 0.5,
                    })

                const canvas =
                    canvasRef.current

                if (!canvas || cancelled) {
                    return
                }

                const context =
                    canvas.getContext("2d")

                if (!context) {
                    return
                }

                canvas.width =
                    viewport.width

                canvas.height =
                    viewport.height

                await page.render({
                    canvasContext: context,
                    viewport,
                }).promise

            } catch (error) {

                console.error(
                    "Failed to render PDF preview:",
                    error
                )
            }
        }

        renderPDF()

        return () => {
            cancelled = true
        }

    }, [file])


    return (

        <canvas
            ref={canvasRef}
            className="pdf-preview-canvas"
        />

    )
}


export default PDFPreview