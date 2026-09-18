package com.devsolve.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "upvotes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "target_type", "target_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Upvote {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "target_type", nullable = false)
    private String targetType; // 'POST', 'SOLUTION', 'COMMENT'

    @Column(name = "target_id", nullable = false)
    private UUID targetId;

    private LocalDateTime createdAt = LocalDateTime.now();
}
