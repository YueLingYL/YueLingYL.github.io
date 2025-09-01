import React, { useState } from 'react';
import './Toolbox.css';
import Calculator from './Calculator';
import TextTransformer from './TextTransformer';

interface Tool {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType<{ onClose: () => void }>;
}

const ToolboxSelector: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools: Tool[] = [
    {
      id: 'calculator',
      name: '计算器',
      icon: '🧮',
      component: Calculator
    },
    {
      id: 'text-transformer',
      name: '文本转换器',
      icon: '📝',
      component: TextTransformer
    }
  ];

  const openTool = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const closeTool = () => {
    setSelectedTool(null);
  };

  return (
    <>
      {selectedTool ? (
        <>
          {/* 使用条件渲染替代动态组件渲染 */}
          {selectedTool === 'calculator' && <Calculator onClose={closeTool} />}
          {selectedTool === 'text-transformer' && <TextTransformer onClose={closeTool} />}
        </>
      ) : (
        <div className="toolbox-container">
          <h2>多功能工具箱</h2>
          <p>选择您需要的工具：</p>
          <div className="tool-selector">
            {tools.map(tool => (
              <div 
                key={tool.id} 
                className="tool-card" 
                onClick={() => openTool(tool.id)}
              >
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-name">{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ToolboxSelector;