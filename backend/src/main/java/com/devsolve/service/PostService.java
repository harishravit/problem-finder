package com.devsolve.service;

import com.devsolve.dto.CreatePostDto;
import com.devsolve.model.Post;
import com.devsolve.model.Upvote;
import com.devsolve.model.User;
import com.devsolve.repository.PostRepository;
import com.devsolve.repository.UpvoteRepository;
import com.devsolve.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final UpvoteRepository upvoteRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository, UpvoteRepository upvoteRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.upvoteRepository = upvoteRepository;
    }

    public Page<Post> getPosts(String category, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return postRepository.searchPosts(category, search, pageable);
    }

    public Optional<Post> getPostById(UUID id) {
        return postRepository.findById(id);
    }

    @Transactional
    public Post createPost(CreatePostDto.Request request, String userId) {
        if (request.getProblemStatement() == null || request.getProblemStatement().trim().length() < 10) {
            throw new IllegalArgumentException("Problem statement must be at least 10 characters long.");
        }

        User author = userRepository.findById(userId).orElseGet(() -> {
            User newUser = new User();
            newUser.setId(userId);
            newUser.setEmail(userId + "@placeholder.dev");
            newUser.setUsername("dev_" + userId.substring(0, Math.min(8, userId.length())));
            return userRepository.save(newUser);
        });

        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setCategory(request.getCategory());
        post.setDifficulty(request.getDifficulty());
        post.setProblemStatement(request.getProblemStatement());
        post.setAuthor(author);

        return postRepository.save(post);
    }

    @Transactional
    public boolean upvotePost(UUID postId, String userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        // Edge case rule: Prevent self-upvoting
        if (post.getAuthor().getId().equals(userId)) {
            throw new IllegalStateException("You cannot upvote your own post.");
        }

        Optional<Upvote> existing = upvoteRepository.findByUserIdAndTargetTypeAndTargetId(userId, "POST", postId);
        if (existing.isPresent()) {
            // Toggle off
            upvoteRepository.delete(existing.get());
            post.setUpvotesCount(Math.max(0, post.getUpvotesCount() - 1));
            postRepository.save(post);
            return false;
        } else {
            Upvote upvote = new Upvote();
            upvote.setUserId(userId);
            upvote.setTargetType("POST");
            upvote.setTargetId(postId);
            upvoteRepository.save(upvote);

            post.setUpvotesCount(post.getUpvotesCount() + 1);
            postRepository.save(post);
            return true;
        }
    }
}
