import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Toolbox from './toolbox/Toolbox';

// 定义待办事项的类型
export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// 定义过滤器类型
type FilterType = 'all' | 'active' | 'completed';

function App() {
  // 状态管理
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const editRef = useRef<HTMLInputElement>(null);

  // 从localStorage加载待办事项
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos, (key, value) => {
        // 将日期字符串转换回Date对象
        if (key === 'createdAt') {
          return new Date(value);
        }
        return value;
      }));
    }
  }, []);

  // 保存待办事项到localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 添加新的待办事项
  const addTodo = () => {
    if (inputText.trim() === '') return;
    
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputText.trim(),
      completed: false,
      createdAt: new Date(),
    };
    
    setTodos([...todos, newTodo]);
    setInputText('');
    inputRef.current?.focus();
  };

  // 处理回车添加待办事项
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // 切换待办事项的完成状态
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // 删除待办事项
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (isEditing === id) {
      setIsEditing(null);
    }
  };

  // 开始编辑待办事项
  const startEditing = (todo: TodoItem) => {
    setIsEditing(todo.id);
    setEditText(todo.text);
    // 使用setTimeout确保DOM更新后再聚焦
    setTimeout(() => {
      editRef.current?.focus();
    }, 0);
  };

  // 保存编辑后的待办事项
  const saveEdit = (id: string) => {
    if (editText.trim() === '') {
      deleteTodo(id);
      setIsEditing(null);
      return;
    }
    
    setTodos(
      todos.map(todo => 
        todo.id === id 
          ? { ...todo, text: editText.trim() }
          : todo
      )
    );
    setIsEditing(null);
    setEditText('');
  };

  // 取消编辑
  const cancelEdit = () => {
    setIsEditing(null);
    setEditText('');
  };

  // 处理编辑时的按键事件
  const handleEditKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // 清除所有已完成的待办事项
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // 过滤待办事项
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 计算未完成的待办事项数量
  const remainingCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">To-Do List</h1>
        <p className="subtitle">管理您的日常任务</p>
      </header>
      
      <div className="todo-container">
        {/* 添加新待办事项 */}
        <div className="add-todo">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="添加新的待办事项..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            添加
          </button>
        </div>

        {/* 待办事项列表 */}
        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty-message">
              {filter === 'all' ? '暂无待办事项' : 
               filter === 'active' ? '暂无未完成的待办事项' : '暂无已完成的待办事项'}
            </li>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                {isEditing === todo.id ? (
                  <div className="edit-container">
                    <input
                      ref={editRef}
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => handleEditKeyPress(e, todo.id)}
                      className="edit-input"
                    />
                    <div className="edit-buttons">
                      <button onClick={() => saveEdit(todo.id)} className="save-button">
                        保存
                      </button>
                      <button onClick={cancelEdit} className="cancel-button">
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="todo-checkbox"
                    />
                    <span className="todo-text" onClick={() => toggleComplete(todo.id)}>
                      {todo.text}
                    </span>
                    <div className="todo-actions">
                      <button onClick={() => startEditing(todo)} className="edit-button">
                        编辑
                      </button>
                      <button onClick={() => deleteTodo(todo.id)} className="delete-button">
                        删除
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>

        {/* 底部控制栏 */}
        <div className="todo-footer">
          <span className="todo-count">
            剩余 {remainingCount} 项
          </span>
          
          <div className="filters">
            <button
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              全部
            </button>
            <button
              className={`filter-button ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              未完成
            </button>
            <button
              className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              已完成
            </button>
          </div>

          {todos.some(todo => todo.completed) && (
            <button onClick={clearCompleted} className="clear-button">
              清除已完成
            </button>
          )}
        </div>
      </div>

      {/* 信息提示 */}
      <div className="info">
        <p>按Enter添加待办事项，点击待办事项标记完成，双击编辑内容</p>
      </div>
      
      {/* 多功能工具箱 */}
      <Toolbox />
    </div>
  );
}

export default App;