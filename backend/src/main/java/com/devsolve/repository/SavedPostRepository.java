package com.devsolve.repository;

import com.devsolve.model.SavedPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SavedPostRepository extends JpaRepository<SavedPost, SavedPost.SavedPostId> {
    List<SavedPost> findByUserId(String userId);
    boolean existsByUserIdAndPostId(String userId, UUID postId);
    void deleteByUserIdAndPostId(String userId, UUID postId);
}
