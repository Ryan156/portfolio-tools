import { useRef, useState } from "react"
import ToolSidebar from "../components/ToolSidebar"
import { PDFDocument } from "pdf-lib"
import PDFPreview from "../components/PDFPreview"

import {
    DndContext,
    closestCenter,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"

import {
    arrayMove,
    SortableContext,
    useSortable,
    rectSortingStrategy,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"


interface PDFFile {
    id: string
    file: File
}


interface SortablePDFCardProps {
    pdf: PDFFile
    onRemove: (id: string) => void
}


function SortablePDFCard({
    pdf,
    onRemove,
}: SortablePDFCardProps) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: pdf.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="pdf-file-card"
            {...attributes}
        >

            <button
                className="remove-pdf"
                type="button"
                onClick={(event) => {
                    event.stopPropagation()
                    onRemove(pdf.id)
                }}
            >
                ×
            </button>

            <div
                className="pdf-preview"
                {...listeners}
            >
                <PDFPreview file={pdf.file} />
            </div>

            <p>{pdf.file.name}</p>

        </div>
    )
}


function PDFMerge() {

    const [pdfFiles, setPdfFiles] =
        useState<PDFFile[]>([])

    const [isDraggingFile, setIsDraggingFile] =
        useState(false)

    const fileInputRef =
        useRef<HTMLInputElement>(null)


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),

        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        })
    )


    function addFiles(files: File[]) {

        const pdfOnly = files.filter(
            (file) => file.type === "application/pdf"
        )

        const newFiles = pdfOnly.map((file) => ({
            id: crypto.randomUUID(),
            file,
        }))

        setPdfFiles((current) => [
            ...current,
            ...newFiles,
        ])
    }


    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const files = Array.from(
            event.target.files || []
        )

        addFiles(files)

        event.target.value = ""
    }


    function handleNativeDragOver(
        event: React.DragEvent<HTMLDivElement>
    ) {

        event.preventDefault()
        setIsDraggingFile(true)
    }


    function handleNativeDragLeave(
        event: React.DragEvent<HTMLDivElement>
    ) {

        event.preventDefault()
        setIsDraggingFile(false)
    }


    function handleNativeDrop(
        event: React.DragEvent<HTMLDivElement>
    ) {

        event.preventDefault()

        setIsDraggingFile(false)

        const files = Array.from(
            event.dataTransfer.files
        )

        addFiles(files)
    }


    function removeFile(id: string) {

        setPdfFiles((current) =>
            current.filter(
                (pdf) => pdf.id !== id
            )
        )
    }


    function handleDragEnd(
        event: DragEndEvent
    ) {

        const { active, over } = event

        if (!over || active.id === over.id) {
            return
        }

        setPdfFiles((current) => {

            const oldIndex =
                current.findIndex(
                    (pdf) =>
                        pdf.id === active.id
                )

            const newIndex =
                current.findIndex(
                    (pdf) =>
                        pdf.id === over.id
                )

            return arrayMove(
                current,
                oldIndex,
                newIndex
            )
        })
    }


    async function mergePDFs() {

        if (pdfFiles.length < 2) {
            return
        }

        const mergedPdf =
            await PDFDocument.create()

        for (const pdfFile of pdfFiles) {

            const fileBytes =
                await pdfFile.file.arrayBuffer()

            const pdf =
                await PDFDocument.load(fileBytes)

            const copiedPages =
                await mergedPdf.copyPages(
                    pdf,
                    pdf.getPageIndices()
                )

            copiedPages.forEach((page) => {
                mergedPdf.addPage(page)
            })
        }

        const mergedPdfBytes =
            await mergedPdf.save()

        const blob = new Blob(
            [mergedPdfBytes],
            {
                type: "application/pdf",
            }
        )

        const url =
            URL.createObjectURL(blob)

        const link =
            document.createElement("a")

        link.href = url
        link.download = "merged.pdf"

        link.click()

        URL.revokeObjectURL(url)
    }


    return (

        <div className="tool-layout">

            <ToolSidebar />

            <div className="tool-main">

                <div>

                    <h1>PDF Merge</h1>

                    <p className="tool-description">
                        Combine PDFs in the order you want.
                    </p>


                    <div className="pdf-merge-workspace">

                        <div
                            className={`pdf-dropzone ${
                                isDraggingFile ? "dragging-file" : ""
                            } ${
                                pdfFiles.length > 0 ? "has-files" : ""
                            }`}
                            onDragOver={handleNativeDragOver}
                            onDragLeave={handleNativeDragLeave}
                            onDrop={handleNativeDrop}
                        >

                            {/* Empty upload prompt */}

                            <div
                                className="pdf-dropzone-prompt"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                            >

                                <div className="pdf-dropzone-icon">
                                    PDF
                                </div>

                                <strong>
                                    Drag & drop PDF files here
                                </strong>

                                <span>
                                    or click to browse
                                </span>

                            </div>


                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                multiple
                                onChange={handleFileChange}
                                hidden
                            />


                            {/* Files inside dropzone */}

                            {pdfFiles.length > 0 && (

                                <div className="pdf-files-container">

                                    <p className="pdf-file-count">

                                        {pdfFiles.length} file
                                        {pdfFiles.length !== 1
                                            ? "s"
                                            : ""
                                        } selected

                                    </p>


                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={
                                            closestCenter
                                        }
                                        onDragEnd={
                                            handleDragEnd
                                        }
                                    >

                                        <SortableContext
                                            items={pdfFiles.map(
                                                (pdf) => pdf.id
                                            )}
                                            strategy={
                                                rectSortingStrategy
                                            }
                                        >

                                            <div className="pdf-file-list">

                                                {pdfFiles.map(
                                                    (pdf) => (

                                                        <SortablePDFCard
                                                            key={pdf.id}
                                                            pdf={pdf}
                                                            onRemove={
                                                                removeFile
                                                            }
                                                        />

                                                    )
                                                )}

                                            </div>

                                        </SortableContext>

                                    </DndContext>

                                </div>

                            )}

                        </div>

                    </div>


                    <div className="pdf-merge-action">

                        <button
                            className="merge-pdf-button"
                            type="button"
                            onClick={mergePDFs}
                            disabled={
                                pdfFiles.length < 2
                            }
                        >
                            Merge PDF
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}


export default PDFMerge