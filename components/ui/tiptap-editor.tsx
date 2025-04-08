import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import Image from 'next/image'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import FontSize from '@tiptap/extension-font-size'
import TextStyle from '@tiptap/extension-text-style'
import ImageTiptap from '@tiptap/extension-image'
import Color from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'

// Định nghĩa kiểu dữ liệu cho props
interface TipTapEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
}

const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  const fontSizes = ['12', '14', '16', '18', '20', '24', '30', '36', '48']
  const [fontSize, setFontSize] = useState('18')

  const updateFontSize = (size: string) => {
    setFontSize(size)
    editor
      .chain()
      .focus()
      .setFontSize(size + 'px')
      .run()
  }
  const clearFormatting = () => {
    editor
      .chain()
      .focus()
      .unsetAllMarks() // Removes all marks (bold, italic, etc.)
      .unsetFontSize()
      .setTextAlign('left')
      .run()
    setFontSize('18') // Reset font size state
  }
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)

    if (editor && !editor.isDestroyed) {
      editor.chain().focus().setImage({ src: url, alt: file.name }).run()
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-y-2 rounded-t-[123px] border-b border-gray-200 bg-white">
      {/* Group 1 */}
      <div className="flex items-center gap-x-2 p-2">
        {/* Font size dropdown */}
        <div className="relative inline-block">
          <select
            value={fontSize}
            onChange={(e) => updateFontSize(e.target.value)}
            className="appearance-none px-2 py-1 pr-8 text-sm text-green-500 focus:border-green-500 focus:outline-none"
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          {/* Icon custom: mũi tên xuống */}
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500">
            <Image
              src="/static/images/up-down.svg"
              alt="Next"
              width={16}
              height={16}
              className="text-primary-500"
            />
          </div>
        </div>
      </div>
      {/* Group 2 */}

      <div className="flex items-center border-l border-[#E2E8F0] pl-2 md:gap-x-2 md:p-2">
        <div className="relative ml-2">
          <input
            type="color"
            id="custom-color-picker"
            onChange={(e) => {
              const color = e.target.value
              editor.chain().focus().setColor(color).run()
            }}
            className="absolute h-0 w-0 opacity-0"
          />
          <label htmlFor="custom-color-picker" className="cursor-pointer">
            <Image src="/static/images/text-color.svg" alt="Next" width={16} height={16} />
          </label>
        </div>
        {/* Clear formatting button */}
        <button
          onClick={clearFormatting}
          className="p-2 text-gray-500"
          title="Clear Formatting"
          aria-label="Clear formatting"
        >
          <Image src="/static/images/clear-formating.svg" alt="Next" width={16} height={16} />
        </button>
        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 ${editor.isActive('bold') ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Image src="/static/images/bold.svg" alt="Next" width={16} height={16} />
        </button>
        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 ${editor.isActive('italic') ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Image src="/static/images/italic.svg" alt="Next" width={16} height={16} />
        </button>
        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 ${editor.isActive('underline') ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Image src="/static/images/underline.svg" alt="Next" width={16} height={16} />
        </button>
        {/* Strike */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 ${editor.isActive('strike') ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Image src="/static/images/strikethrough.svg" alt="Next" width={16} height={16} />
        </button>
      </div>
      {/* Group 3 */}
      <div className="flex items-center border-l border-[#E2E8F0] pl-2 md:gap-x-2 md:p-2">
        {/* Left */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 ${editor.isActive({ textAlign: 'left' }) ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Image
            src="/static/images/align-right.svg"
            alt="align left"
            width={18}
            height={18}
            className="sm:h-5 sm:w-5"
          />
        </button>
        {/* Center */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 ${editor.isActive({ textAlign: 'center' }) ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Image
            src="/static/images/align-center.svg"
            alt="align center"
            width={18}
            height={18}
            className="sm:h-5 sm:w-5"
          />
        </button>
        {/* Right */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 ${editor.isActive({ textAlign: 'right' }) ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Image
            src="/static/images/align-right.svg"
            alt="align left"
            width={18}
            height={18}
            className="sm:h-5 sm:w-5"
          />
        </button>
      </div>
      {/* Group 4 */}
      <div className="flex items-center border-l border-[#E2E8F0] pl-2 md:gap-x-2 md:p-2">
        {/* Bullet List */}
        <button
          onClick={() => {
            console.log('Toggle bullet list')
            editor.chain().focus().toggleBulletList().run()
          }}
          className={`p-2 ${editor.isActive('bulletList') ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Image src="/static/images/list-bullet.svg" alt="Next" width={16} height={16} />
        </button>
        {/* Ordered List */}
        <button
          onClick={() => {
            console.log('Toggle ordered list')
            editor.chain().focus().toggleOrderedList().run()
          }}
          className={`p-2 ${editor.isActive('orderedList') ? 'text-green-500' : 'text-gray-500'}`}
        >
          <Image src="/static/images/list-number.svg" alt="Next" width={16} height={16} />
        </button>
      </div>
      {/* Group 5 */}
      <div className="flex items-center border-l border-[#E2E8F0] pl-2 md:gap-x-2 md:p-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-input"
        />
        <button
          onClick={() => document.getElementById('image-input')?.click()}
          className="p-2 text-gray-500 hover:text-green-500"
          title="Upload image"
        >
          <Image
            src="/static/images/image.svg"
            alt="Upload image"
            width={18}
            height={18}
            className="sm:h-5 sm:w-5"
          />
        </button>
      </div>
      <div className="flex items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
        />
        <button
          disabled
          onClick={() => document.getElementById('image-upload')?.click()}
          className="cursor-not-allowed p-2 text-gray-500 hover:text-green-500"
          title="Upload image"
        >
          <Image
            src="/static/images/upload.svg"
            alt="Upload image"
            width={18}
            height={18}
            className="sm:h-5 sm:w-5"
          />
        </button>
      </div>
    </div>
  )
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content = '',
  onChange,
  placeholder = 'Write something...',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-4',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-4',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'my-2',
        },
      }),
      ImageTiptap,
      TextStyle,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'orderedList'],
      }),
      FontSize.configure({
        types: ['textStyle'],
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-node-empty',
      }),
    ],
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML())
      }
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[200px] prose max-w-none',
      },
    },
  })

  // Add useEffect to update content when prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className="w-full rounded-[24px] bg-white shadow-[0px_0px_30px_rgba(242,84,45,0.10)] outline outline-1 -outline-offset-[1px] outline-secondary-500/30">
      <MenuBar editor={editor} />
      <div className="relative">
        <EditorContent
          className="prose max-w-none p-4 [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none"
          editor={editor}
        />
        <style jsx global>{`
          .ProseMirror.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
          }
          .ProseMirror p.is-node-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #adb5bd;
            pointer-events: none;
            height: 0;
          }
        `}</style>
      </div>
    </div>
  )
}

export default TipTapEditor
