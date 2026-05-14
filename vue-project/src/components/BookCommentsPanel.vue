<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from '../composables/useI18n';

const props = defineProps<{
  bookId: number;
}>();

const emit = defineEmits(['close']);
const { t } = useI18n();

const comments = ref<any[]>([]);
const newComment = ref('');
const isLoggedIn = ref(false);
const userName = ref('');
const userReactions = ref<Record<string, string>>({});

onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
  userName.value = localStorage.getItem('userName') || 'Anonym';
  
  const allComments = JSON.parse(localStorage.getItem('book_comments') || '{}');
  comments.value = allComments[props.bookId] || [];

  userReactions.value = JSON.parse(localStorage.getItem('user_comment_reactions') || '{}');
});

const submitComment = () => {
  if (!newComment.value.trim()) return;

  const allComments = JSON.parse(localStorage.getItem('book_comments') || '{}');
  if (!allComments[props.bookId]) allComments[props.bookId] = [];
  const commentObj = {
    id: Date.now().toString(),
    user: userName.value,
    text: newComment.value,
    date: new Date().toLocaleString(),
    likes: 0,
    dislikes: 0
  };
  allComments[props.bookId].push(commentObj);
  localStorage.setItem('book_comments', JSON.stringify(allComments));
  comments.value.push(commentObj);

  newComment.value = '';
};

// Enter tugmasini bosganda yuborish
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    submitComment();
  }
};

const handleReaction = (commentId: string, type: 'like' | 'dislike') => {
  if (!isLoggedIn.value) return;

  const userKey = `${userName.value}_${commentId}`;
  const currentReaction = userReactions.value[userKey];

  const allComments = JSON.parse(localStorage.getItem('book_comments') || '{}');
  const bookComments = allComments[props.bookId] || [];
  const comment = bookComments.find((c: any) => c.id === commentId);

  if (comment) {
    if (typeof comment.likes !== 'number') comment.likes = 0;
    if (typeof comment.dislikes !== 'number') comment.dislikes = 0;

    if (currentReaction === type) {
      if (type === 'like') comment.likes--;
      else comment.dislikes--;
      delete userReactions.value[userKey];
    } else {
      if (currentReaction) {
        if (currentReaction === 'like') comment.likes--;
        else comment.dislikes--;
      }
      if (type === 'like') comment.likes++;
      else comment.dislikes++;
      userReactions.value[userKey] = type;
    }
    localStorage.setItem('book_comments', JSON.stringify(allComments));
    localStorage.setItem('user_comment_reactions', JSON.stringify(userReactions.value));
    comments.value = bookComments;
  }
};

const getUserReaction = (commentId: string) => {
  return userReactions.value[`${userName.value}_${commentId}`];
};
</script>

<template>
  <div class="comments-overlay" @click.self="emit('close')">
    <div class="comments-panel">
      <div class="comments-header">
        <h3>{{ t('comments') }}</h3>
        <button class="close-mini-btn" @click="emit('close')">×</button>
      </div>

      <div class="comments-list">
        <div v-if="comments.length === 0" class="no-comments">
          <div class="no-comments-icon">💬</div>
          <p>{{ t('noComments') }}</p>
        </div>
        <div v-else v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-user">
            <span class="user-avatar-mini">{{ comment.user.charAt(0).toUpperCase() }}</span>
            <span class="user-name">{{ comment.user }}</span>
            <span class="comment-date">{{ comment.date }}</span>
          </div>
          <p class="comment-text">{{ comment.text }}</p>
          <div class="comment-footer">
            <button class="reaction-btn" 
                    :class="{ active: getUserReaction(comment.id) === 'like' }"
                    @click="handleReaction(comment.id, 'like')">
              👍 <span>{{ comment.likes || 0 }}</span>
            </button>
            <button class="reaction-btn" 
                    :class="{ active: getUserReaction(comment.id) === 'dislike' }"
                    @click="handleReaction(comment.id, 'dislike')">
              👎 <span>{{ comment.dislikes || 0 }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="comment-input-area" v-if="isLoggedIn">
        <textarea v-model="newComment" 
                 :placeholder="t('writeComment')" 
                 rows="2"
                 @keydown="handleKeydown"></textarea>
        <button @click="submitComment" :disabled="!newComment.trim()" class="send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
      <div class="login-prompt" v-else>
        <p>{{ t('loginToComment') }} <router-link to="/login">{{ t('login') }}</router-link></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comments-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  justify-content: flex-end;
  z-index: 100;
  backdrop-filter: blur(2px);
}

.comments-panel {
  width: 320px;
  background: var(--surface);
  height: 100%;
  box-shadow: -5px 0 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease-out;
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.comments-header {
  padding: 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comments-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}

.close-mini-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--text-muted);
}

.comments-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.no-comments {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
}

.no-comments-icon {
  font-size: 40px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.comment-item {
  background: var(--bg);
  padding: 12px;
  border-radius: 12px;
}

.comment-user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.user-avatar-mini {
  width: 24px;
  height: 24px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
}

.user-name {
  font-size: 13px;
  font-weight: 700;
}

.comment-date {
  font-size: 10px;
  color: var(--text-muted);
  margin-left: auto;
}

.comment-text {
  font-size: 13px;
  line-height: 1.4;
  margin: 0 0 12px 0;
  color: var(--text);
}

.comment-footer {
  display: flex;
  gap: 12px;
  border-top: 1px solid var(--border);
  padding-top: 8px;
  margin-top: 8px;
}

.reaction-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  cursor: pointer;
  color: var(--text-muted);
  transition: all 0.2s;
  padding: 4px 8px;
  border-radius: 6px;
}

.reaction-btn:hover {
  background: var(--surface);
  color: var(--primary);
}

.reaction-btn.active {
  background: var(--primary);
  color: white;
}

.reaction-btn span {
  font-weight: 700;
}

.comment-input-area {
  padding: 16px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 12px;
  align-items: flex-end;
  background: var(--surface);
  position: relative;
  z-index: 110;
}

.comment-input-area textarea {
  flex: 1;
  background: var(--bg);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  color: var(--text);
  resize: none;
  outline: none;
  transition: all 0.2s;
  cursor: text;
}

.comment-input-area textarea:focus {
  border-color: var(--primary);
  background: var(--surface);
  box-shadow: 0 0 0 4px rgba(45, 49, 166, 0.1);
}

.send-btn {
  background: var(--primary);
  color: white;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05) translateY(-2px);
  background: var(--primary-light);
}

.send-btn:active {
  transform: scale(0.95);
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(1);
}

.login-prompt {
  padding: 20px;
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
}
</style>
