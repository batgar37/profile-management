package com.bgarrido.profilemanagement.service;

import com.bgarrido.profilemanagement.entity.TypeUser;
import com.bgarrido.profilemanagement.entity.User;
import com.bgarrido.profilemanagement.repository.TypeUserRepository;
import com.bgarrido.profilemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

@Service
public class TypeUserServiceImpl implements TypeUserService{

    private TypeUserRepository typeUserRepository;
    private UserRepository userRepository;

    @Autowired
    public TypeUserServiceImpl(TypeUserRepository typeUserRepository, UserRepository userRepository) {
        this.typeUserRepository = typeUserRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<TypeUser> findAll() {
        return typeUserRepository.findAll();
    }

    @Override
    public TypeUser findById(int id) {
        Optional<TypeUser> result = typeUserRepository.findById(id);
        TypeUser typeUser = null;
        if (result.isPresent()) {
            typeUser = result.get();
        }

        return typeUser;
    }

    @Override
    public TypeUser save(TypeUser typeUser) {
        return typeUserRepository.save(typeUser);
    }

    @Override
    public TypeUser deleteById(int id) {
        TypeUser typeUser = findById(id);
        List<User> usersWithThisType = userRepository.findByTypeUser(typeUser);

        for (User user : usersWithThisType) {
            user.setTypeUser(null);
            userRepository.save(user);
        }

        typeUserRepository.deleteById(id);
        return typeUser;
    }

    @Override
    public TypeUser findByType(String type) {
        List<TypeUser> typeUsers = typeUserRepository.findByType(type);
        if (!typeUsers.isEmpty()) {
            return typeUsers.getFirst();
        }
        return null;
    }
}
