import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import { useState, useEffect, useRef } from 'react'
import { cloudinaryUpload } from '@/utils/cloudinaryUpload'
import { LinkPopover } from './tiptap-ui/link-popover'
import { AiFillHighlight } from "react-icons/ai";
import { FaListOl, FaStrikethrough, FaList, FaUnderline, FaItalic } from "react-icons/fa";
import { CiTextAlignRight, CiTextAlignCenter,CiTextAlignLeft,CiTextAlignJustify, CiImageOn } from "react-icons/ci";
import { GoHorizontalRule } from "react-icons/go";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";

type RichTextEditorProps = {
  content?: string
  onChange: (content: string) => void
  placeholder?: string
}

export const RichTextEditor = ({
  content = '',
  onChange,
  placeholder = 'Enter job description...'
}: RichTextEditorProps) => {
  const [hydrated, setHydrated] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // These extentions have been disabled due to conflict
        italic: false,
        heading: false,
        strike: false,
        horizontalRule: false
      }),
      Image,
      Highlight,
      HardBreak,
      Underline,
      Italic,
      HorizontalRule,
      Strike,
      Link.configure({
        openOnClick: false,
        autolink:false,
        HTMLAttributes: {
          target: '_blank',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[700px] p-2 border rounded',
        placeholder,
      },
    },
  })

  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content)
      setHydrated(true)
    }
  }, [editor, content, hydrated])

  

  return (
    <>
    <MenuBar editor={editor} />
    <div className="border rounded-lg">
      <EditorContent editor={editor} className="h-[500px] overflow-y-scroll" />
    </div>
    </>
  )
}

const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && editor) {
      try {
        // Replace this with your actual Cloudinary upload implementation
        const imageUrl = await cloudinaryUpload(file)
        
        editor.chain().focus().setImage({ src: imageUrl }).run()
      } catch (error) {
        console.error('Error uploading image:', error)
      } finally {
        // Reset input value to allow selecting the same file again
        if (fileInputRef.current) fileInputRef.current.value = ''
      }
    }
  }

  if (!editor) return null

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-gray-50">
      <button
      type='button'
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`p-2 rounded ${editor.isActive('paragraph') ? 'bg-gray-200' : ''}`}
      >
       Paragraph
      </button>
     
      <LinkPopover editor={editor}/>

      <button
      type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
      >
       Bold 
      </button>

      <LuHeading1 title='heading-1' 
        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
        className={`p-2 rounded ${editor.isActive('heading', {level: 1}) ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'}`}
      />
      <LuHeading2 title='heading-2' 
        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
        className={`p-2 rounded ${editor.isActive('heading', {level: 2}) ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'}`}
      />
      <LuHeading3 title='heading-3' 
        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
        className={`p-2 rounded ${editor.isActive('heading', {level: 3}) ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'}`}
      />

      <FaList title='bullet-list' 
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'}`}
      />

      <FaListOl title='ordered-list'  onClick={() => editor.chain().focus().toggleOrderedList().run()} 
      className={editor.isActive('orderedList') ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />

      <AiFillHighlight title='Highlight' onClick={() => editor.chain().focus().toggleHighlight().run()} 
      className={editor.isActive('highlight') ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />

      <FaUnderline title='underline' onClick={() => editor.chain().focus().toggleUnderline().run()} 
      className={editor.isActive('underline') ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />

      <CiTextAlignLeft title='align-left' onClick={() => editor.chain().focus().toggleTextAlign('left').run()} 
      className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />

      <CiTextAlignCenter title='align-center' onClick={() => editor.chain().focus().toggleTextAlign('center').run()} 
      className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />
      
      <CiTextAlignRight title='align-right' onClick={() => editor.chain().focus().toggleTextAlign('right').run()} 
      className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />

      <CiTextAlignJustify title='align-justify' onClick={() => editor.chain().focus().toggleTextAlign('justify').run()} 
      className={editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />
      
      <FaItalic title='italics' onClick={() => editor.chain().focus().toggleItalic().run()} 
      className={editor.isActive('italic') ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />

      <FaStrikethrough title='line-through' onClick={() => editor.chain().focus().toggleStrike().run()} 
      className={editor.isActive('strike') ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />

      <GoHorizontalRule title='horizontal-rule' onClick={() => editor.chain().focus().setHorizontalRule().run()} 
      className={editor.isActive('horizontalRule') ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />

      <MdOutlineInsertPageBreak title='line-break' onClick={() => editor.chain().focus().setHardBreak().run()} 
      className={editor.isActive('hardBreak') ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />

      <CiImageOn title='insert-image'  onClick={() => fileInputRef.current?.click()}
      className={editor.isActive('image') ? 'bg-gray-200 w-12 h-10 p-[10px] rounded-md  cursor-pointer': 'w-12 h-10 p-[10px] rounded-md cursor-pointer'} />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
     
      {/* Add more formatting options as needed */}
    </div>
  )
}