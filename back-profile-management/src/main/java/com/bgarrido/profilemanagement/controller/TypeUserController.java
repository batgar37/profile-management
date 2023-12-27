package com.bgarrido.profilemanagement.controller;

import com.bgarrido.profilemanagement.entity.TypeUser;
import com.bgarrido.profilemanagement.service.TypeUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Type;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/type-users")
public class TypeUserController {

    private TypeUserService typeUserService;

    @Autowired
    public TypeUserController(TypeUserService typeUserService) {
        this.typeUserService = typeUserService;
    }

    @GetMapping("")
    public List<TypeUser> findAll() {
        return typeUserService.findAll();
    }

    @GetMapping("/{id}")
    public TypeUser findById(@PathVariable int id) {
        return typeUserService.findById(id);
    }

    @PostMapping("/create")
    public TypeUser addTypeUser(@RequestBody TypeUser typeUser) {
        return typeUserService.save(typeUser);
    }

    @PutMapping("/update")
    public TypeUser updateTypeUser(@RequestBody TypeUser typeUser) {
        int id = typeUser.getId();
        TypeUser dbTypeUser = typeUserService.findById(id);
        if (dbTypeUser == null) {
            throw new ResponseStatusException(NOT_FOUND, "Unable to find typeUser with id : " + id);
        }
        return typeUserService.save(typeUser);
    }

    @DeleteMapping("/{id}")
    public void deleteTypeUser(@PathVariable int id) {
        typeUserService.deleteById(id);
    }
}
