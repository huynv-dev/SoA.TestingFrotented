import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 mx-auto">
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
          className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center mb-4 ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <MdFileUpload className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-gray-600 mb-2 text-sm sm:text-base">Drag and drop an image here, or</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-blue-500 hover:text-blue-700 font-medium text-sm sm:text-base"
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
              <Image
                src={previewUrl || imageUrl}
                alt="Preview"
                width={200}
                height={200}
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
  const savedSelectionRef = useRef<Range | null>(null);

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

  // Cải thiện hàm saveSelection để đảm bảo lưu đúng selection
const saveSelection = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    // Kiểm tra xem selection có đang nằm trong editor không
    if (editorRef.current?.contains(range.commonAncestorContainer)) {
      savedSelectionRef.current = range.cloneRange();
    }
  }
};

  // Cải thiện hàm restoreSelection để kiểm tra kỹ lưỡng hơn
const restoreSelection = () => {
  if (savedSelectionRef.current && editorRef.current) {
    const selection = window.getSelection();
    if (selection) {
      try {
        selection.removeAllRanges();
        selection.addRange(savedSelectionRef.current);
      } catch (e) {
        console.error('Error restoring selection:', e);
      }
    }
  }
};

const handleFontSize = (size: number) => {
  setFontSize(size);
  setShowFontSizeDropdown(false);
  
  // Khôi phục selection trước khi thực hiện thay đổi
  restoreSelection();
  
  // Thực hiện thay đổi font size
  if (savedSelectionRef.current) {
    // Tạo span với font-size mới
    const span = document.createElement('span');
    span.style.fontSize = `${size}px`;
    
    // Lấy nội dung của selection và đặt vào span
    const content = savedSelectionRef.current.extractContents();
    span.appendChild(content);
    
    // Chèn span vào vị trí selection
    savedSelectionRef.current.insertNode(span);
    
    // Đặt con trỏ sau span mới được chèn
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      const range = document.createRange();
      range.setStartAfter(span);
      selection.addRange(range);
    }
    
    // Cập nhật nội dung
    handleContentChange();
  }
  
  // Focus vào editor
  editorRef.current?.focus();
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
    <div className="rounded-[24px] shadow-[0px_0px_30px_rgba(242,84,45,0.10)] outline outline-1 outline-secondary-500/30 -outline-offset-[1px] bg-white w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center border-b border-gray-200 px-2 sm:px-4 py-2 bg-white rounded-t-[123px] gap-y-2">
        {/* Font size button */}
        <div className="relative pr-2" ref={fontSizeDropdownRef}>
          <button
            className="flex items-center"
            onClick={() => {
              saveSelection();
              setShowFontSizeDropdown(!showFontSizeDropdown);
            }}
          >
            <span className="text-[#0E9594] text-sm sm:text-base font-semibold font-poppins leading-[22px] break-words">
              {fontSize}
            </span>
            <Image
              src="/static/images/up-down.svg"
              alt="Next"
              width={16}
              height={16}
              className="text-primary-500"
            />
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

        {/* Group formatting buttons */}
        <div className="flex items-center gap-1 border-l border-[#E2E8F0] pl-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {[
              {
                type: 'image' as const,
                src: '/static/images/text-color.svg',
                cmd: 'foreColor',
                title: 'Text Color',
                color: '#562C2C'
              },
              {
                type: 'image' as const,
                src: '/static/images/clear-formating.svg',
                cmd: 'removeFormat',
                title: 'Clear Formatting'
              },
              {
                type: 'image' as const,
                src: '/static/images/bold.svg',
                cmd: 'bold',
                title: 'Bold'
              },
              {
                type: 'image' as const,
                src: '/static/images/italic.svg',
                cmd: 'italic',
                title: 'Italic'
              },
              {
                type: 'image' as const,
                src: '/static/images/underline.svg',
                cmd: 'underline',
                title: 'Underline'
              },
              {
                type: 'image' as const,
                src: '/static/images/strikethrough.svg',
                cmd: 'strikeThrough',
                title: 'Strikethrough'
              }
            ].map((item) => (
              <button
                key={item.cmd}
                className="p-1 sm:p-1.5 hover:bg-gray-100 rounded text-gray-700"
                onClick={() => item.cmd === 'foreColor' ? handleCommand(item.cmd, item.color) : handleCommand(item.cmd)}
                title={item.title}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={18}
                  height={18}
                  className="text-blue sm:w-5 sm:h-5"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Group alignment buttons */}
        <div className="flex items-center gap-1 border-l border-[#E2E8F0] pl-2 ml-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <button
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-blue hover:bg-gray-50 rounded"
              onClick={() => handleCommand('justifyLeft')}
              title="Align Left"
            >
              <Image src="/static/images/align-right.svg" alt="align left" width={18} height={18} className="sm:w-5 sm:h-5" />
            </button>
            <button
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-blue hover:bg-gray-50 rounded"
              onClick={() => handleCommand('justifyCenter')}
              title="Align Center"
            >
              <Image src="/static/images/align-center.svg" alt="align center" width={18} height={18} className="sm:w-5 sm:h-5" />
            </button>
            <button
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-blue hover:bg-gray-50 rounded"
              onClick={() => handleCommand('justifyRight')}
              title="Align Right"
            >
              <Image src="/static/images/align-right.svg" alt="align right" width={18} height={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Group list buttons */}
        <div className="flex items-center gap-1 border-l border-[#E2E8F0] pl-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {[
              {
                type: 'image' as const,
                src: '/static/images/list-bullet.svg',
                cmd: 'insertUnorderedList',
                title: 'Bullet List'
              },
              {
                type: 'image' as const,
                src: '/static/images/list-number.svg',
                cmd: 'insertOrderedList',
                title: 'Numbered List'
              }
            ].map((item) => (
              <button
                key={item.cmd}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-blue hover:bg-gray-50 rounded"
                onClick={() => handleCommand(item.cmd)}
                title={item.title}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={18}
                  height={18}
                  className="sm:w-5 sm:h-5"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Insert and Upload buttons */}
        <div className="flex items-center gap-1 border-l border-[#E2E8F0] pl-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {[
              {
                type: 'image' as const,
                src: '/static/images/image.svg',
                cmd: 'insertImage',
                title: 'Insert Image'
              },
              {
                type: 'image' as const,
                src: '/static/images/upload.svg',
                cmd: 'upload',
                title: 'Upload File'
              }
            ].map((item) => (
              <button
                key={item.cmd}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-blue hover:bg-gray-50 rounded"
                onClick={() => {
                  if (item.cmd === 'insertImage') {
                    setShowImageModal(true);
                  } else if (item.cmd === 'upload') {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '*/*';
                    input.style.display = 'none';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        console.log('File selected:', file);
                      }
                    };
                    document.body.appendChild(input);
                    input.click();
                    document.body.removeChild(input);
                  }
                }}
                title={item.title}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  width={18}
                  height={18}
                  className="sm:w-5 sm:h-5"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editable content area */}
      <div
        ref={editorRef}
        className="p-2 sm:p-4 min-h-[150px] focus:outline-none"
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
