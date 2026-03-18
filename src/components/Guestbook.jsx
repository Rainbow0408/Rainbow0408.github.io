import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Smile, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'ra1nb0w_guestbook';

const PRESET_MESSAGES = [
  { id: 101, nickname: '匿名访客', content: '你挺牛', time: '2026/3/16 10:24:00', reactions: {} },
  { id: 102, nickname: '匿名访客', content: '二次元来了', time: '2026/3/16 14:15:22', reactions: {} },
  { id: 103, nickname: '匿名访客', content: '逛到这里，留个脚印～', time: '2026/3/16 18:40:11', reactions: {} },
  { id: 104, nickname: '匿名访客', content: '路过，主页挺好看的！', time: '2026/3/16 21:05:44', reactions: {} },
  { id: 105, nickname: '匿名访客', content: '留个言。', time: '2026/3/16 23:58:12', reactions: {} },
  { id: 106, nickname: '匿名访客', content: '手机看的时候好卡啊', time: '2026/3/17 08:30:05', reactions: {} },
  { id: 107, nickname: '匿名访客', content: '啥时候学的这些', time: '2026/3/17 10:12:33', reactions: {} },
  { id: 108, nickname: '匿名访客', content: '老弟又装上了 感觉不如纺织', time: '2026/3/17 11:45:00', reactions: {} },
  { id: 109, nickname: '匿名访客', content: '网页挺好看的。', time: '2026/3/17 13:20:18', reactions: {} },
  { id: 110, nickname: '匿名访客', content: '动漫集为什么都是女生？', time: '2026/3/17 14:55:40', reactions: {} },
  { id: 111, nickname: '匿名访客', content: '前端清爽，接口稳，好评！', time: '2026/3/17 16:10:09', reactions: {} },
  { id: 112, nickname: '匿名访客', content: '页面很干净，一看就是用心写的。', time: '2026/3/17 18:33:21', reactions: {} },
  { id: 113, nickname: '匿名访客', content: '留言功能正常，测试通过 ✔️', time: '2026/3/17 20:05:55', reactions: {} },
  { id: 114, nickname: '匿名访客', content: '自己搭的站？这集神了', time: '2026/3/17 21:40:12', reactions: {} },
  { id: 115, nickname: '匿名访客', content: '网站做得挺精致，但感觉不如当数学老师', time: '2026/3/17 23:15:33', reactions: {} }
];

function loadMessages() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const localMsgs = saved ? JSON.parse(saved) : [];
    const allMsgs = [...localMsgs];
    PRESET_MESSAGES.forEach(pm => {
      if (!allMsgs.find(m => m.id === pm.id)) {
        allMsgs.push(pm);
      }
    });
    return allMsgs
      .map(m => ({ ...m, nickname: '匿名访客', reactions: {} })) // Force anonymity and clear reactions
      .sort((a, b) => new Date(b.time) - new Date(a.time));
  } catch { return PRESET_MESSAGES; }
}

function saveMessages(msgs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

export function Guestbook() {
  const [messages, setMessages] = useState(loadMessages);
  const [content, setContent] = useState('');

  useEffect(() => { saveMessages(messages); }, [messages]);

  const addMessage = () => {
    const text = content.trim();
    if (!text) return;
    const msg = {
      id: Date.now(),
      nickname: '匿名访客',
      content: text,
      time: new Date().toLocaleString('zh-CN'),
      reactions: {},
    };
    setMessages(prev => [msg, ...prev]);
    setContent('');
  };

  const removeMessage = (msgId) => {
    setMessages(prev => prev.filter(m => m.id !== msgId));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
      className="w-full my-12"
    >
      <div className="p-6 sm:p-8 rounded-3xl bg-white/20 dark:bg-black/20 backdrop-blur-sm md:backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/20 dark:border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
              留言板
            </h2>
            <p className="text-xs font-mono text-gray-500 dark:text-gray-400 tracking-widest uppercase">
              Guestbook — 匿名留言，保护隐私
            </p>
          </div>
        </div>

        {/* Input area */}
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="说点什么吧…"
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addMessage()}
                className="w-full px-4 py-3 rounded-xl bg-white/30 dark:bg-white/5 border border-white/30 dark:border-white/10 text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>
            <button
              onClick={addMessage}
              disabled={!content.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              发送
            </button>
          </div>
        </div>

        {/* Messages list */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
          {messages.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
              还没有留言，来做第一个吧 ✨
            </div>
          )}
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group p-4 rounded-2xl bg-white/15 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:bg-white/25 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{msg.nickname}</span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 text-sm break-words">{msg.content}</p>
                  </div>
                  <button
                    onClick={() => removeMessage(msg.id)}
                    className="opacity-0 group-hover:opacity-60 hover:!opacity-100 text-gray-400 hover:text-red-400 transition-all p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
