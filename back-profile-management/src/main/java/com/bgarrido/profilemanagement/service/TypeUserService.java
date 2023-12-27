package com.bgarrido.profilemanagement.service;

import com.bgarrido.profilemanagement.entity.TypeUser;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TypeUserService {

        List<TypeUser> findAll();
        TypeUser findById(int id);
        TypeUser save(TypeUser typeUser);
        TypeUser deleteById(int id);

        TypeUser findByType(String type);
}
