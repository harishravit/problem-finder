package com.devsolve.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category; // Web Dev, Mobile, AI/ML, DevOps, Data Science, etc.

    @Column(nullable = false)
    private String difficulty = "Medium"; // Beginner, Medium, Advanced

    @Column(columnDefinition = "TEXT", nullable = false)
    private String problemStatement;

    private String status = "open"; // open, solved

    private Integer upvotesCount = 0;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
}
