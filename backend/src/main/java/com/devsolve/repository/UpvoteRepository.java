package com.devsolve.repository;

import com.devsolve.model.Upvote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UpvoteRepository extends JpaRepository<Upvote, UUID> {
    Optional<Upvote> findByUserIdAndTargetTypeAndTargetId(String userId, String targetType, UUID targetId);
    boolean existsByUserIdAndTargetTypeAndTargetId(String userId, String targetType, UUID targetId);
    void deleteByUserIdAndTargetTypeAndTargetId(String userId, String targetType, UUID targetId);
}
