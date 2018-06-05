package com.ebookstore.reactspringrest;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.stereotype.Service;
import javax.persistence.criteria.JoinType;

import java.util.List;

import java.security.acl.Group;


@Service
public class VolumeSpecifications {


    public static Specification<Volume> titleContains(String title) {
        return StringUtils.isEmpty(title) ? null : (root, query, cb) -> {
            return cb.like(root.get("title"), "%" + title + "%");
        };
    }

    public static Specification<Volume> descriptionContains(String description) {
        return StringUtils.isEmpty(description) ? null : (root, query, cb) -> {
            return cb.like(root.get("description"), "%" + description + "%");
        };
    }

    public static Specification<Volume> authorContains(String author) {
        return StringUtils.isEmpty(author) ? null : (root, query, cb) -> {
            return cb.like(root.get("author"), "%" + author + "%");
        };
    }

    public static Specification<Volume> categoryContains(String category) {
        return StringUtils.isEmpty(category) ? null : (root, query, cb) -> {
            return cb.like(root.get("category"), "%" + category + "%");
        };
    }

    public static Specification<Volume> languageContains(String language) {
        return StringUtils.isEmpty(language) ? null : (root, query, cb) -> {
            return cb.like(root.get("language"), "%" + language + "%");
        };
    }

    public static Specification<Volume> containsCategories(List<String> categories) {
        return  StringUtils.isEmpty(categories) ? null : (root, query, cb) -> {
            return root.<Group>get("category").in(categories);
        };
    }
/*
    //not leaving out version
    public static Specification<User> exampleqeury(final List<Long> groupIds){
        return new Specification<User>() {
            public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder){
                final Path<Group> group = root.<Group> get("group");
                return group.in(groupIds);
            }
        };
    }
*/
    /*

    // 価格（最低価格）以上のもの
    public static Specification<Volume> priceGreaterThanEqual(Float priceFrom) {
        return StringUtils.isEmpty(priceFrom) ? null : (root, query, cb) -> {
            return cb.greaterThanOrEqualTo(root.get("price"), priceFrom);
        };
    }

    // 価格（最高価格）以下のもの
    public static Specification<Volume> priceLessThanEqual(Float priceTo) {
        return StringUtils.isEmpty(priceTo) ? null : (root, query, cb) -> {
            return cb.lessThanOrEqualTo(root.get("price"), priceTo);
        };
    }

    */
}
