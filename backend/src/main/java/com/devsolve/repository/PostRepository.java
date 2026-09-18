package com.devsolve.repository;

import com.devsolve.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {

    Page<Post> findByCategoryOrderByCreatedAtDesc(String category, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE " +
           "(:category IS NULL OR :category = 'All' OR p.category = :category) AND " +
           "(:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.problemStatement) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Post> searchPosts(@Param("category") String category, @Param("search") String search, Pageable pageable);
}
