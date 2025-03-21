import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../components/colors";

const ChatScreen = () => {
  const [comments, setComments] = useState({});
  const [currentComment, setCurrentComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);

  const users = [
    { id: 1, name: "User A" },
    { id: 2, name: "User B" },
    { id: 3, name: "User C" },
  ];

  const handleLike = (userId, commentId, replyId = null) => {
    const updatedComments = comments[userId].map((comment) => {
      if (comment.id === commentId) {
        if (replyId) {
          const updatedReplies = comment.replies.map((reply) =>
            reply.id === replyId
              ? { ...reply, likes: reply.likes === 0 ? 1 : 0 }
              : reply
          );
          return { ...comment, replies: updatedReplies };
        }
        return { ...comment, likes: comment.likes === 0 ? 1 : 0 };
      }
      return comment;
    });

    setComments({ ...comments, [userId]: updatedComments });
  };

  const handleSend = () => {
    if (currentComment.trim() === "") return;

    const userComments = comments[activeUserId] || [];
    let updatedComments;

    if (replyTo) {
      updatedComments = userComments.map((comment) =>
        comment.id === replyTo
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), text: currentComment, likes: 0 },
                {
                  id: Date.now() + 1,
                  text: null, // Auto-reply has no text
                  likes: 0,
                  isAutoReply: true,
                },
              ],
            }
          : comment
      );
      setReplyTo(null);
    } else {
      const newComment = {
        id: Date.now(),
        text: currentComment,
        likes: 0,
        replies: [
          {
            id: Date.now() + 1,
            text: null,
            likes: 0,
            isAutoReply: true,
          },
        ],
      };
      updatedComments = [...userComments, newComment];
    }

    setComments({ ...comments, [activeUserId]: updatedComments });
    setCurrentComment("");
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentBubble}>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => handleLike(activeUserId, item.id)}
            style={styles.likeButton}
          >
            <MaterialIcons name="thumb-up" size={16} color={Colors.accent} />
            <Text style={styles.likeCount}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setReplyTo(item.id)}
            style={styles.replyButton}
          >
            <Text style={styles.replyButtonText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
      {item.replies.length > 0 && (
        <View style={styles.replyContainer}>
          {item.replies.map((reply) => (
            <View key={reply.id} style={styles.replyBubble}>
              {reply.text ? (
                <Text style={styles.replyText}>{reply.text}</Text>
              ) : (
                // Auto-reply with like button and input field
                <View style={styles.autoReplyContainer}>
                  <TouchableOpacity
                    onPress={() => handleLike(activeUserId, item.id, reply.id)}
                    style={styles.likeButton}
                  >
                    <MaterialIcons name="thumb-up" size={14} color={Colors.accent} />
                    <Text style={styles.likeCount}>{reply.likes}</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.autoReplyInput}
                    placeholder="Write a reply..."
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {activeUserId ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setActiveUserId(null)}
              style={styles.closeButton}
            >
              <MaterialIcons name="arrow-back" size={24} color={Colors.white} />
              <Text style={styles.closeButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              Chat with {users.find((user) => user.id === activeUserId)?.name}
            </Text>
          </View>
          <FlatList
            data={comments[activeUserId] || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderComment}
            contentContainerStyle={styles.commentList}
          />
          <View style={styles.inputContainer}>
            {replyTo && (
              <Text style={styles.replyToText}>
                Replying to:{" "}
                {comments[activeUserId]?.find((comment) => comment.id === replyTo)
                  ?.text}
              </Text>
            )}
            <TextInput
              style={styles.input}
              value={currentComment}
              onChangeText={setCurrentComment}
              placeholder={
                replyTo ? "Reply to a comment..." : "Add a comment..."
              }
            />
            {currentComment.trim() !== "" && (
              <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <MaterialIcons name="send" size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => setActiveUserId(item.id)}
            >
              <Text style={styles.userName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.userList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.accent,
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeButtonText: {
    marginLeft: 5,
    color: Colors.white,
    fontSize: 16,
  },
  headerTitle: {
    marginLeft: 15,
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  userList: {
    padding: 10,
  },
  userItem: {
    padding: 15,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    marginBottom: 10,
  },
  userName: {
    color: Colors.textDark,
    fontSize: 16,
  },
  commentList: {
    padding: 10,
  },
  autoReplyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  autoReplyInput: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15, 
    backgroundColor: Colors.surfaceLight, 
    borderTopWidth: 1, 
    borderColor: Colors.lightGray, 
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  sendButton: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10, 
  },
});

export default ChatScreen;
