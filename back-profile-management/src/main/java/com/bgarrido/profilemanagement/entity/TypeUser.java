package com.bgarrido.profilemanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "type_user")
public class TypeUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "type_user")
    @NotNull(message = "The type user must be set")
    private String type;

    public TypeUser() {
    }

    public TypeUser(String type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "TypeUser{" +
                "id=" + id +
                ", type_user='" + type + '\'' +
                '}';
    }
}
