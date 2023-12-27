package com.bgarrido.profilemanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    @NotNull(message = "The name must be set")
    @Size(min = 3 ,message = "The name must have 3 character")
    private String name;

    @Column(name = "email")
    @NotNull(message = "The email must be set")
    @Email(message = "The email must respect the xx@xx.x format")
    private String email;

    @ManyToOne(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "type_user_id")
    private TypeUser typeUser;

    public User() {
    }

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public TypeUser getTypeUser() {
        return typeUser;
    }

    public void setTypeUser(TypeUser typeUser) {
        this.typeUser = typeUser;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", typeUser=" + typeUser +
                '}';
    }
}
