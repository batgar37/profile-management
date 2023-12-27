package com.bgarrido.profilemanagement.repository;

import com.bgarrido.profilemanagement.entity.TypeUser;
import com.bgarrido.profilemanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByTypeUser(TypeUser typeUser);
}
