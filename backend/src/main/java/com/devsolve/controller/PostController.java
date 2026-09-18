package com.devsolve.controller;

import com.devsolve.dto.CreatePostDto;
import com.devsolve.model.Post;
import com.devsolve.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<Page<Post>> getPosts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(postService.getPosts(category, search, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable UUID id) {
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody CreatePostDto.Request request, Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        try {
            Post created = postService.createPost(request, userId);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/upvote")
    public ResponseEntity<?> upvotePost(@PathVariable UUID id, Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        try {
            boolean upvoted = postService.upvotePost(id, userId);
            return ResponseEntity.ok(Map.of("upvoted", upvoted));
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable UUID id, Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        try {
            postService.deletePost(id, userId);
            return ResponseEntity.ok(Map.of("message", "Post deleted successfully"));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
