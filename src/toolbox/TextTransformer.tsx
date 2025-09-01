import React, { useState, useRef } from 'react';
import './Toolbox.css';

interface TextTransformerProps {
  onClose: () => void;
}

const TextTransformer: React.FC<TextTransformerProps> = ({ onClose }) => {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [lastOperation, setLastOperation] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleTransform = (operation: string) => {
    if (!inputText) return;
    
    let transformedText = '';
    
    switch (operation) {
      case 'uppercase':
        transformedText = inputText.toUpperCase();
        break;
      case 'lowercase':
        transformedText = inputText.toLowerCase();
        break;
      case 'capitalize':
        transformedText = inputText.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
        break;
      case 'reverse':
        transformedText = inputText.split('').reverse().join('');
        break;
      case 'remove-spaces':
        transformedText = inputText.replace(/\s+/g, '');
        break;
      case 'count':
        const charCount = inputText.length;
        const wordCount = inputText.trim() === '' ? 0 : inputText.trim().split(/\s+/).length;
        const lineCount = inputText.split('\n').length;
        transformedText = `字符数: ${charCount}\n单词数: ${wordCount}\n行数: ${lineCount}`;
        break;
      case 'copy':
        if (resultRef.current) {
          const textToCopy = resultRef.current.textContent || '';
          navigator.clipboard.writeText(textToCopy).then(() => {
            alert('已复制到剪贴板！');
          }).catch(err => {
            console.error('复制失败:', err);
          });
        }
        return;
      default:
        transformedText = inputText;
    }
    
    setResultText(transformedText);
    setLastOperation(operation);
  };

  const handleClear = () => {
    setInputText('');
    setResultText('');
    setLastOperation(null);
  };

  const handleRefresh = () => {
    if (lastOperation) {
      handleTransform(lastOperation);
    }
  };

  const handleCopyResult = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText).then(() => {
        alert('已复制到剪贴板！');
      }).catch(err => {
        console.error('复制失败:', err);
      });
    }
  };

  return (
    <div className="tool-modal">
      <div className="tool-header">
        <h2>文本转换器</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="text-transformer-container">
        <div className="text-input-container">
          <textarea
            className="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="请输入要转换的文本..."
            rows={6}
          />
        </div>
        
        <div className="transform-buttons">
          <button className="transform-button" onClick={() => handleTransform('uppercase')}>
            全部大写
          </button>
          <button className="transform-button" onClick={() => handleTransform('lowercase')}>
            全部小写
          </button>
          <button className="transform-button" onClick={() => handleTransform('capitalize')}>
            首字母大写
          </button>
          <button className="transform-button" onClick={() => handleTransform('reverse')}>
            反转文本
          </button>
          <button className="transform-button" onClick={() => handleTransform('remove-spaces')}>
            移除空格
          </button>
          <button className="transform-button" onClick={() => handleTransform('count')}>
            统计字数
          </button>
          <button className="transform-button" onClick={handleClear}>
            清空
          </button>
          <button className="transform-button" onClick={handleRefresh}>
            刷新
          </button>
        </div>
        
        {resultText && (
          <div className="result-container">
            <h3>转换结果：</h3>
            <div className="result-text" ref={resultRef}>
              {resultText}
            </div>
            <button className="copy-button" onClick={handleCopyResult}>
              复制结果
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextTransformer;