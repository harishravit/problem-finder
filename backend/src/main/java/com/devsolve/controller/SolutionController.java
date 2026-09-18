package com.devsolve.controller;

import com.devsolve.dto.CreatePostDto;
import com.devsolve.model.Solution;
import com.devsolve.service.SolutionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/solutions")
@CrossOrigin(origins = "*")
public class SolutionController {

    private final SolutionService solutionService;

    public SolutionController(SolutionService solutionService) {
        this.solutionService = solutionService;
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Solution>> getSolutionsByPost(@PathVariable UUID postId) {
        return ResponseEntity.ok(solutionService.getSolutionsByPost(postId));
    }

    @PostMapping
    public ResponseEntity<?> submitSolution(@RequestBody CreatePostDto.SolutionRequest request, Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        try {
            Solution created = solutionService.submitSolution(request, userId);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/upvote")
    public ResponseEntity<?> upvoteSolution(@PathVariable UUID id, Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        try {
            boolean upvoted = solutionService.upvoteSolution(id, userId);
            return ResponseEntity.ok(Map.of("upvoted", upvoted));
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSolution(@PathVariable UUID id, Principal principal) {
        String userId = principal != null ? principal.getName() : "anonymous_user";
        try {
            solutionService.deleteSolution(id, userId);
            return ResponseEntity.ok(Map.of("message", "Solution deleted successfully"));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
