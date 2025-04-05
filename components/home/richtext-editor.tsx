import { useState, useRef, useEffect, useCallback } from 'react';
import {
  MdFormatSize,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdInsertLink,
  MdImage,
  MdTableChart,
  MdFormatClear,
  MdFileDownload,
  MdKeyboardArrowDown,
  MdClose,
  MdFileUpload,
  MdLink
} from 'react-icons/md';

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
}

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (imageUrl: string) => void;
}

const ImageUploadModal = ({ isOpen, onClose, onInsert }: ImageUploadModalProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      setImageUrl('');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setPreviewUrl('');
  };

  const handleInsert = () => {
    if (previewUrl) {
      onInsert(previewUrl);
    } else if (imageUrl) {
      onInsert(imageUrl);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Insert Image</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <MdFileUpload className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-gray-600 mb-2">Drag and drop an image here, or</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Choose a file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* URL Input */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MdLink size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Or enter image URL"
              value={imageUrl}
              onChange={handleUrlInput}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Preview */}
        {(previewUrl || imageUrl) && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <div className="border rounded-lg p-2 flex items-center justify-center bg-gray-50">
              <img
                src={previewUrl || imageUrl}
                alt="Preview"
                className="max-h-48 object-contain"
                onError={() => setPreviewUrl('')}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!previewUrl && !imageUrl}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default function RichTextEditor({ 
  initialValue = '', 
  onChange, 
  placeholder = 'Start typing...' 
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialValue);
  const [fontSize, setFontSize] = useState(18);
  const [showFontSizeDropdown, setShowFontSizeDropdown] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fontSizeDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current && initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  const handleContentChange = useCallback(() => {
    if (!editorRef.current) return;
    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
    onChange?.(newContent);
  }, [onChange]);

  const handleCommand = useCallback((command: string, value?: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
  
    const range = selection.getRangeAt(0);
    
    // Handle alignment commands directly with execCommand
    if (['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'].includes(command)) {
      document.execCommand(command, false);
      editorRef.current?.focus();
      handleContentChange();
      return;
    }

    // Handle special commands
    if (command === 'createLink') {
      const url = prompt('Enter URL:');
      if (url) {
        document.execCommand(command, false, url);
        editorRef.current?.focus();
        handleContentChange();
      }
      return;
    }

    if (command === 'insertTable') {
      const rows = prompt('Enter number of rows:', '3');
      const cols = prompt('Enter number of columns:', '3');
      if (rows && cols) {
        const table = document.createElement('table');
        table.style.border = '1px solid #ccc';
        table.style.borderCollapse = 'collapse';
        
        for (let i = 0; i < parseInt(rows); i++) {
          const row = table.insertRow();
          for (let j = 0; j < parseInt(cols); j++) {
            const cell = row.insertCell();
            cell.style.border = '1px solid #ccc';
            cell.style.padding = '8px';
            cell.innerHTML = '&nbsp;';
          }
        }
        
        range.insertNode(table);
        editorRef.current?.focus();
        handleContentChange();
      }
      return;
    }

    if (command === 'removeFormat') {
      document.execCommand(command, false);
      editorRef.current?.focus();
      handleContentChange();
      return;
    }
    
    const span = document.createElement('span');
  
    switch (command) {
      case 'bold':
        span.style.fontWeight = 'bold';
        break;
      case 'italic':
        span.style.fontStyle = 'italic';
        break;
      case 'underline':
        span.style.textDecoration = 'underline';
        break;
      case 'strikeThrough':
        span.style.textDecoration = 'line-through';
        break;
      case 'fontSize':
        if (value) span.style.fontSize = `${value}px`;
        break;
      default:
        console.warn(`Unsupported command: ${command}`);
        return;
    }
  
    span.appendChild(range.extractContents());
    range.insertNode(span);
    selection.removeAllRanges();
    selection.addRange(range);
  
    editorRef.current?.focus();
    handleContentChange();
  }, [handleContentChange]);
  
  

  const handleFontSize = (size: number) => {
    setFontSize(size);
    document.execCommand('fontSize', false, '7');
    
    const fontElements = editorRef.current?.querySelectorAll('font[size="7"]') || [];
    fontElements.forEach((element) => {
      element.removeAttribute('size');
      (element as HTMLElement).style.fontSize = `${size}px`;
    });

    setShowFontSizeDropdown(false);
    editorRef.current?.focus();
    handleContentChange();
  };

  const applyHeading = (level: string) => {
    document.execCommand('formatBlock', false, `h${level}`);
    editorRef.current?.focus();
    handleContentChange();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fontSizeDropdownRef.current && !fontSizeDropdownRef.current.contains(event.target as Node)) {
        setShowFontSizeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36];

  const handleInsertImage = (imageUrl: string) => {
    if (!editorRef.current) return;
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.insertNode(img);
      range.collapse(false);
    } else {
      editorRef.current.appendChild(img);
    }
    
    handleContentChange();
  };

  return (
    <div className="border border-gray-200 rounded-md">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-gray-200 p-2 bg-white rounded-t-md">
        {/* Font size button */}
        <div className="relative" ref={fontSizeDropdownRef}>
          <button 
            className="flex items-center gap-0.5 text-gray-700 hover:bg-gray-100 rounded p-1.5"
            onClick={() => setShowFontSizeDropdown(!showFontSizeDropdown)}
          >
            <MdFormatSize size={20} />
            <span className="text-sm">{fontSize}</span>
            <MdKeyboardArrowDown size={16} />
          </button>
          
          {showFontSizeDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10">
              {fontSizes.map((size) => (
                <button
                  key={size}
                  className="block w-full text-left px-3 py-1 hover:bg-gray-100 text-sm"
                  onClick={() => handleFontSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text formatting buttons */}
        {[
          { Icon: MdFormatBold, cmd: 'bold', title: 'Bold' },
          { Icon: MdFormatItalic, cmd: 'italic', title: 'Italic' },
          { Icon: MdFormatUnderlined, cmd: 'underline', title: 'Underline' },
          { Icon: MdFormatStrikethrough, cmd: 'strikeThrough', title: 'Strikethrough' }
        ].map(({ Icon, cmd, title }) => (
          <button 
            key={cmd}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
            onClick={() => handleCommand(cmd)}
            title={title}
          >
            <Icon size={20} />
          </button>
        ))}

        {/* Text alignment buttons */}
        {[
          { Icon: MdFormatAlignLeft, cmd: 'justifyLeft', title: 'Align Left' },
          { Icon: MdFormatAlignCenter, cmd: 'justifyCenter', title: 'Align Center' },
          { Icon: MdFormatAlignRight, cmd: 'justifyRight', title: 'Align Right' },
          { Icon: MdFormatAlignJustify, cmd: 'justifyFull', title: 'Justify' }
        ].map(({ Icon, cmd, title }) => (
          <button 
            key={cmd}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
            onClick={() => handleCommand(cmd)}
            title={title}
          >
            <Icon size={20} />
          </button>
        ))}

        {/* List buttons */}
        {[
          { Icon: MdFormatListBulleted, cmd: 'insertUnorderedList', title: 'Bullet List' },
          { Icon: MdFormatListNumbered, cmd: 'insertOrderedList', title: 'Numbered List' }
        ].map(({ Icon, cmd, title }) => (
          <button 
            key={cmd}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
            onClick={() => handleCommand(cmd)}
            title={title}
          >
            <Icon size={20} />
          </button>
        ))}

        {/* Insert buttons */}
        {[
          { Icon: MdInsertLink, cmd: 'createLink', title: 'Insert Link' },
          { Icon: MdImage, cmd: 'insertImage', title: 'Insert Image' },
          { Icon: MdTableChart, cmd: 'insertTable', title: 'Insert Table' }
        ].map(({ Icon, cmd, title }) => (
          <button 
            key={cmd}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
            onClick={() => {
              if (cmd === 'insertImage') {
                setShowImageModal(true);
              } else {
                handleCommand(cmd);
              }
            }}
            title={title}
          >
            <Icon size={20} />
          </button>
        ))}

        {/* Clear formatting button */}
        <button 
          className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
          onClick={() => handleCommand('removeFormat')}
          title="Clear Formatting"
        >
          <MdFormatClear size={20} />
        </button>

        {/* Download button */}
        <button 
          className="p-1.5 hover:bg-gray-100 rounded text-gray-700"
          onClick={() => {
            if (!editorRef.current) return;
            const blob = new Blob([editorRef.current.innerHTML], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'content.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }}
          title="Download Content"
        >
          <MdFileDownload size={20} />
        </button>

        {/* Heading selector */}
        <select 
          className="ml-auto px-2 py-1 border border-gray-200 rounded text-sm text-gray-700"
          onChange={(e) => applyHeading(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Format</option>
          {[1, 2, 3, 4, 5, 6].map((h) => (
            <option key={h} value={h}>Heading {h}</option>
          ))}
          <option value="p">Paragraph</option>
        </select>
      </div>

      {/* Editable content area */}
      <div
        ref={editorRef}
        className="p-4 min-h-[150px] focus:outline-none"
        contentEditable={true}
        onInput={handleContentChange}
        onBlur={handleContentChange}
        dangerouslySetInnerHTML={{ __html: initialValue || placeholder }}
        data-placeholder={placeholder}
      />

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onInsert={handleInsertImage}
      />
    </div>
  );
}
