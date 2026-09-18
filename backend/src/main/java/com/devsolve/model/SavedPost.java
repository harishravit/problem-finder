package com.devsolve.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "saved_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(SavedPost.SavedPostId.class)
public class SavedPost {

    @Id
    @Column(name = "user_id")
    private String userId;

    @Id
    @Column(name = "post_id")
    private UUID postId;

    private LocalDateTime createdAt = LocalDateTime.now();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @EqualsAndHashCode
    public static class SavedPostId implements Serializable {
        private String userId;
        private UUID postId;
    }
}
