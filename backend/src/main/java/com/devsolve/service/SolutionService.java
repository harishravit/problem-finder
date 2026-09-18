package com.devsolve.service;

import com.devsolve.dto.CreatePostDto;
import com.devsolve.model.Post;
import com.devsolve.model.Solution;
import com.devsolve.model.Upvote;
import com.devsolve.model.User;
import com.devsolve.repository.PostRepository;
import com.devsolve.repository.SolutionRepository;
import com.devsolve.repository.UpvoteRepository;
import com.devsolve.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SolutionService {

    private final SolutionRepository solutionRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final UpvoteRepository upvoteRepository;

    public SolutionService(SolutionRepository solutionRepository, PostRepository postRepository,
                           UserRepository userRepository, UpvoteRepository upvoteRepository) {
        this.solutionRepository = solutionRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.upvoteRepository = upvoteRepository;
    }

    public List<Solution> getSolutionsByPost(UUID postId) {
        return solutionRepository.findByPostIdOrderByUpvotesCountDesc(postId);
    }

    @Transactional
    public Solution submitSolution(CreatePostDto.SolutionRequest request, String userId) {
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        User author = userRepository.findById(userId).orElseGet(() -> {
            User newUser = new User();
            newUser.setId(userId);
            newUser.setEmail(userId + "@placeholder.dev");
            newUser.setUsername("solver_" + userId.substring(0, Math.min(8, userId.length())));
            return userRepository.save(newUser);
        });

        Solution solution = new Solution();
        solution.setPost(post);
        solution.setAuthor(author);
        solution.setRepoLink(request.getRepoLink());
        solution.setLiveDemoLink(request.getLiveDemoLink());
        solution.setWriteup(request.getWriteup());

        // Update post status to solved if first solution
        if ("open".equalsIgnoreCase(post.getStatus())) {
            post.setStatus("solved");
            postRepository.save(post);
        }

        return solutionRepository.save(solution);
    }

    @Transactional
    public boolean upvoteSolution(UUID solutionId, String userId) {
        Solution solution = solutionRepository.findById(solutionId)
                .orElseThrow(() -> new IllegalArgumentException("Solution not found"));

        // Guard against self-upvoting
        if (solution.getAuthor().getId().equals(userId)) {
            throw new IllegalStateException("You cannot upvote your own solution.");
        }

        Optional<Upvote> existing = upvoteRepository.findByUserIdAndTargetTypeAndTargetId(userId, "SOLUTION", solutionId);
        if (existing.isPresent()) {
            upvoteRepository.delete(existing.get());
            solution.setUpvotesCount(Math.max(0, solution.getUpvotesCount() - 1));
            solutionRepository.save(solution);
            return false;
        } else {
            Upvote upvote = new Upvote();
            upvote.setUserId(userId);
            upvote.setTargetType("SOLUTION");
            upvote.setTargetId(solutionId);
            upvoteRepository.save(upvote);

            solution.setUpvotesCount(solution.getUpvotesCount() + 1);
            solutionRepository.save(solution);
            return true;
        }
    }

    @Transactional
    public void deleteSolution(UUID solutionId, String userId) {
        Solution solution = solutionRepository.findById(solutionId)
                .orElseThrow(() -> new IllegalArgumentException("Solution not found"));

        if (!solution.getAuthor().getId().equals(userId)) {
            throw new IllegalStateException("Only the author of this solution can delete it.");
        }

        solutionRepository.delete(solution);
    }
}
