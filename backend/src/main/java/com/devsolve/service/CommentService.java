package com.devsolve.service;

import com.devsolve.dto.CreatePostDto;
import com.devsolve.model.Comment;
import com.devsolve.model.Post;
import com.devsolve.model.User;
import com.devsolve.repository.CommentRepository;
import com.devsolve.repository.PostRepository;
import com.devsolve.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public List<Comment> getCommentTree(UUID postId) {
        return commentRepository.findByPostIdAndParentIsNullOrderByCreatedAtAsc(postId);
    }

    @Transactional
    public Comment addComment(CreatePostDto.CommentRequest request, String userId) {
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        User author = userRepository.findById(userId).orElseGet(() -> {
            User newUser = new User();
            newUser.setId(userId);
            newUser.setEmail(userId + "@placeholder.dev");
            newUser.setUsername("commenter_" + userId.substring(0, Math.min(8, userId.length())));
            return userRepository.save(newUser);
        });

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setAuthor(author);
        comment.setContent(request.getContent());

        if (request.getParentId() != null) {
            Comment parentComment = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
            comment.setParent(parentComment);
        }

        return commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(UUID commentId, String userId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        if (!comment.getAuthor().getId().equals(userId)) {
            throw new IllegalStateException("Only the author of this comment can delete it.");
        }

        commentRepository.delete(comment);
    }
}
