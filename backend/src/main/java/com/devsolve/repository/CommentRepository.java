package com.devsolve.repository;

import com.devsolve.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    // Root comments have parent IS NULL
    List<Comment> findByPostIdAndParentIsNullOrderByCreatedAtAsc(UUID postId);
    
    List<Comment> findByPostIdOrderByCreatedAtAsc(UUID postId);
}
