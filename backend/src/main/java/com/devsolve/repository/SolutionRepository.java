package com.devsolve.repository;

import com.devsolve.model.Solution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SolutionRepository extends JpaRepository<Solution, UUID> {
    List<Solution> findByPostIdOrderByUpvotesCountDesc(UUID postId);
}
