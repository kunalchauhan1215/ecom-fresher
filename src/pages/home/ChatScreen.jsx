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
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const handleLike = (commentId, replyId = null) => {
    const updatedComments = comments.map((comment) => {
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
    setComments(updatedComments);
  };

  const handleSend = () => {
    if (currentComment.trim() === "") return;

    const lowerText = currentComment.toLowerCase();
    let autoReply = null;

    // Basic sentiment analysis
    if (
      lowerText.includes("great") ||
      lowerText.includes("good") ||
      lowerText.includes("amazing") ||
      lowerText.includes("very adorable")
    ) {
      autoReply = "Thank you for your positive feedback!";
    } else if (
      lowerText.includes("bad") ||
      lowerText.includes("poor") ||
      lowerText.includes("terrible") ||
      lowerText.includes("worst")
    ) {
      autoReply = "We're sorry to hear about your experience. We'll strive to improve.";
    }

    let updatedComments;
    if (replyTo) {
      updatedComments = comments.map((comment) =>
        comment.id === replyTo
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), text: currentComment, likes: 0 },
                ...(autoReply
                  ? [
                      {
                        id: Date.now() + 1,
                        text: autoReply,
                        likes: 0,
                        isAutoReply: true,
                      },
                    ]
                  : []),
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
        replies: autoReply
          ? [
              {
                id: Date.now() + 1,
                text: autoReply,
                likes: 0,
                isAutoReply: true,
              },
            ]
          : [],
      };
      updatedComments = [...comments, newComment];
    }

    setComments(updatedComments);
    setCurrentComment("");
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentBubble}>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => handleLike(item.id)}
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
            <View
              key={reply.id}
              style={[
                styles.replyBubble,
                reply.isAutoReply && styles.autoReplyBubble,
              ]}
            >
              <Text
                style={[
                  styles.replyText,
                  reply.isAutoReply && { color: Colors.lightBlue },
                ]}
              >
                {reply.text}
              </Text>
              <TouchableOpacity
                onPress={() => handleLike(item.id, reply.id)}
                style={styles.likeButton}
              >
                <MaterialIcons name="thumb-up" size={14} color={Colors.accent} />
                <Text style={styles.likeCount}>{reply.likes}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderComment}
        contentContainerStyle={styles.commentList}
      />
      <View style={styles.inputContainer}>
        {replyTo && (
          <Text style={styles.replyToText}>
            Replying to: {comments.find((comment) => comment.id === replyTo)?.text}
          </Text>
        )}
        <TextInput
          style={styles.input}
          value={currentComment}
          onChangeText={setCurrentComment}
          placeholder={replyTo ? "Reply to a comment..." : "Add a comment..."}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <MaterialIcons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
  },
  commentList: {
    padding: 10,
  },
  commentContainer: {
    marginBottom: 15,
  },
  commentBubble: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
    maxWidth: "90%",
  },
  commentText: {
    color: Colors.textDark,
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  likeCount: {
    marginLeft: 5,
    color: Colors.textDark,
  },
  replyButtonText: {
    color: Colors.textDark,
  },
  replyContainer: {
    marginTop: 5,
    paddingLeft: 20,
  },
  replyBubble: {
    backgroundColor: Colors.lightGray,
    padding: 5,
    borderRadius: 10,
    marginBottom: 2,
  },
  autoReplyBubble: {
    backgroundColor: Colors.surfaceLight,
    borderLeftWidth: 2,
    borderLeftColor: Colors.accent,
  },
  replyText: {
    color: Colors.lightPurple,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: Colors.lightGray,
  },
  replyToText: {
    color: Colors.accent,
    marginBottom: 5,
    fontStyle: "italic",
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
