export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  // Please add more locations to show features

  {
    "id": 0,
    "name": "Spicy restaurant",
    "robot": {
      "id": "abcde123",
      "is_online": true
    }
  },
  {
    "id": 1,
    "name": "Salty restaurant",
    "robot": {
      "id": "fghij456",
      "is_online": false
    }
  },
  {
    "id": 2,
    "name": "Sweet restaurant",
    "robot": {
      "id": "klmno789",
      "is_online": true
    }
  },
  {
    "id": 3,
    "name": "Sour restaurant",
    "robot": {
      "id": "pqrst101",
      "is_online": false
    }
  },
  {
    "id": 4,
    "name": "Bitter restaurant",
    "robot": {
      "id": "uvwxy112",
      "is_online": true
    }
  },
  {
    "id": 5,
    "name": "Umami restaurant",
    "robot": {
      "id": "zabcd123",
      "is_online": false
    }
  },
  {
    "id": 6,
    "name": "Tangy restaurant",
    "robot": {
      "id": "efghi456",
      "is_online": true
    }
  },
  {
    "id": 7,
    "name": "Savory restaurant",
    "robot": {
      "id": "jklmn789",
      "is_online": false
    }
  },
  {
    "id": 8,
    "name": "Herby restaurant",
    "robot": {
      "id": "opqrs101",
      "is_online": true
    }
  },
  {
    "id": 9,
    "name": "Zesty restaurant",
    "robot": {
      "id": "tuvwx112",
      "is_online": false
    }
  },
  {
    "id": 10,
    "name": "Peppery restaurant",
    "robot": {
      "id": "yzabc123",
      "is_online": true
    }
  },
  {
    "id": 11,
    "name": "Garlicky restaurant",
    "robot": {
      "id": "defgh456",
      "is_online": false
    }
  },
  {
    "id": 12,
    "name": "Cheesy restaurant",
    "robot": {
      "id": "ijklm789",
      "is_online": true
    }
  },
  {
    "id": 13,
    "name": "Nutty restaurant",
    "robot": {
      "id": "nopqr101",
      "is_online": false
    }
  },
  {
    "id": 14,
    "name": "Fruity restaurant",
    "robot": {
      "id": "stuvw112",
      "is_online": true
    }
  }
];
