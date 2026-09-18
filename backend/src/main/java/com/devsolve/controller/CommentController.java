package com.devsolve.controller;

import com.devsolve.dto.CreatePostDto;
import com.devsolve.model.Comment;
import com.devsolve.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentTree(@PathVariable UUID postId) {
        return ResponseEntity.ok(commentService.getCommentTree(postId));
    }

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody CreatePostDto.CommentRequest request, Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        try {
            Comment created = commentService.addComment(request, userId);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable UUID id, Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        try {
            commentService.deleteComment(id, userId);
            return ResponseEntity.ok(Map.of("message", "Comment deleted successfully"));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
