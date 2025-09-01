import React, { useState } from 'react';
import './Toolbox.css';
import ToolboxSelector from './ToolboxSelector';

interface ToolboxProps {
  // 可选的自定义标题
  title?: string;
  // 可选的自定义图标
  icon?: string;
}

const Toolbox: React.FC<ToolboxProps> = ({ title = '多功能工具箱', icon = '🧰' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleToolbox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 工具箱启动按钮 - 移至主界面显示 */}
      <button 
        onClick={toggleToolbox} 
        className="toolbox-button"
        style={{
          width: '200px',
          height: '50px',
          borderRadius: '25px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)',
          transition: 'all 0.3s ease',
          margin: '20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        {icon} {title}
      </button>

      {/* 工具箱面板 */}
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div 
            onClick={toggleToolbox}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 998,
              backdropFilter: 'blur(2px)'
            }}
          />
          
          {/* 工具箱内容 */}
          <div 
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              zIndex: 999,
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              animation: 'slideIn 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ToolboxSelector />
          </div>
        </>
      )}

      {/* 动画样式 */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
};

export default Toolbox;