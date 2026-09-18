package com.devsolve.controller;

import com.devsolve.model.SavedPost;
import com.devsolve.repository.SavedPostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/saved")
@CrossOrigin(origins = "*")
public class SavedPostController {

    private final SavedPostRepository savedPostRepository;

    public SavedPostController(SavedPostRepository savedPostRepository) {
        this.savedPostRepository = savedPostRepository;
    }

    @GetMapping
    public ResponseEntity<List<SavedPost>> getSavedPosts(Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        return ResponseEntity.ok(savedPostRepository.findByUserId(userId));
    }

    @PostMapping("/{postId}")
    public ResponseEntity<?> toggleSavePost(@PathVariable UUID postId, Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        if (savedPostRepository.existsByUserIdAndPostId(userId, postId)) {
            savedPostRepository.deleteByUserIdAndPostId(userId, postId);
            return ResponseEntity.ok(Map.of("saved", false));
        } else {
            SavedPost savedPost = new SavedPost(userId, postId, java.time.LocalDateTime.now());
            savedPostRepository.save(savedPost);
            return ResponseEntity.ok(Map.of("saved", true));
        }
    }
}
