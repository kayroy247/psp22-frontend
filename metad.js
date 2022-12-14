export const metadata = {
    source: {
      hash: "0x3ac99f9b715cd08934e15dbc6bc2e9b0396ec66e69317ea4aedafa493d3583c2",
      language: "ink! 3.0.1",
      compiler: "rustc 1.65.0-nightly"
    },
    contract: {
      name: "psp22",
      version: "0.1.0",
      authors: [
        "astar"
      ]
    },
    V3: {
      spec: {
        constructors: [
          {
            args: [
              {
                label: "total_supply",
                type: {
                  displayName: [
                    "Balance"
                  ],
                  type: 0
                }
              }
            ],
            docs: [],
            label: "new",
            payable: false,
            selector: "0x9bae9d5e"
          }
        ],
        docs: [],
        events: [],
        messages: [
          {
            args: [
              {
                label: "hated",
                type: {
                  displayName: [
                    "AccountId"
                  ],
                  type: 2
                }
              }
            ],
            docs: [],
            label: "set_hated_account",
            mutates: true,
            payable: false,
            returnType: null,
            selector: "0x19398962"
          },
          {
            args: [],
            docs: [],
            label: "get_hated_account",
            mutates: false,
            payable: false,
            returnType: {
              displayName: [
                "AccountId"
              ],
              type: 2
            },
            selector: "0x9e5e363f"
          },
          {
            args: [],
            docs: [],
            label: "get_total_supply",
            mutates: false,
            payable: false,
            returnType: {
              displayName: [
                "Balance"
              ],
              type: 0
            },
            selector: "0xb079adab"
          },
          {
            args: [
              {
                label: "to",
                type: {
                  displayName: [
                    "psp22_external",
                    "TransferInput1"
                  ],
                  type: 2
                }
              },
              {
                label: "value",
                type: {
                  displayName: [
                    "psp22_external",
                    "TransferInput2"
                  ],
                  type: 0
                }
              },
              {
                label: "data",
                type: {
                  displayName: [
                    "psp22_external",
                    "TransferInput3"
                  ],
                  type: 9
                }
              }
            ],
            docs: [],
            label: "PSP22::transfer",
            mutates: true,
            payable: false,
            returnType: {
              displayName: [
                "psp22_external",
                "TransferOutput"
              ],
              type: 10
            },
            selector: "0xdb20f9f5"
          },
          {
            args: [
              {
                label: "spender",
                type: {
                  displayName: [
                    "psp22_external",
                    "IncreaseAllowanceInput1"
                  ],
                  type: 2
                }
              },
              {
                label: "delta_value",
                type: {
                  displayName: [
                    "psp22_external",
                    "IncreaseAllowanceInput2"
                  ],
                  type: 0
                }
              }
            ],
            docs: [],
            label: "PSP22::increase_allowance",
            mutates: true,
            payable: false,
            returnType: {
              displayName: [
                "psp22_external",
                "IncreaseAllowanceOutput"
              ],
              type: 10
            },
            selector: "0x96d6b57a"
          },
          {
            args: [
              {
                label: "spender",
                type: {
                  displayName: [
                    "psp22_external",
                    "ApproveInput1"
                  ],
                  type: 2
                }
              },
              {
                label: "value",
                type: {
                  displayName: [
                    "psp22_external",
                    "ApproveInput2"
                  ],
                  type: 0
                }
              }
            ],
            docs: [],
            label: "PSP22::approve",
            mutates: true,
            payable: false,
            returnType: {
              displayName: [
                "psp22_external",
                "ApproveOutput"
              ],
              type: 10
            },
            selector: "0xb20f1bbd"
          },
          {
            args: [
              {
                label: "from",
                type: {
                  displayName: [
                    "psp22_external",
                    "TransferFromInput1"
                  ],
                  type: 2
                }
              },
              {
                label: "to",
                type: {
                  displayName: [
                    "psp22_external",
                    "TransferFromInput2"
                  ],
                  type: 2
                }
              },
              {
                label: "value",
                type: {
                  displayName: [
                    "psp22_external",
                    "TransferFromInput3"
                  ],
                  type: 0
                }
              },
              {
                label: "data",
                type: {
                  displayName: [
                    "psp22_external",
                    "TransferFromInput4"
                  ],
                  type: 9
                }
              }
            ],
            docs: [],
            label: "PSP22::transfer_from",
            mutates: true,
            payable: false,
            returnType: {
              displayName: [
                "psp22_external",
                "TransferFromOutput"
              ],
              type: 10
            },
            selector: "0x54b3c76e"
          },
          {
            args: [],
            docs: [],
            label: "PSP22::total_supply",
            mutates: false,
            payable: false,
            returnType: {
              displayName: [
                "psp22_external",
                "TotalSupplyOutput"
              ],
              type: 0
            },
            selector: "0x162df8c2"
          },
          {
            args: [
              {
                label: "spender",
                type: {
                  displayName: [
                    "psp22_external",
                    "DecreaseAllowanceInput1"
                  ],
                  type: 2
                }
              },
              {
                label: "delta_value",
                type: {
                  displayName: [
                    "psp22_external",
                    "DecreaseAllowanceInput2"
                  ],
                  type: 0
                }
              }
            ],
            docs: [],
            label: "PSP22::decrease_allowance",
            mutates: true,
            payable: false,
            returnType: {
              displayName: [
                "psp22_external",
                "DecreaseAllowanceOutput"
              ],
              type: 10
            },
            selector: "0xfecb57d5"
          },
          {
            args: [
              {
                label: "owner",
                type: {
                  displayName: [
                    "psp22_external",
                    "BalanceOfInput1"
                  ],
                  type: 2
                }
              }
            ],
            docs: [],
            label: "PSP22::balance_of",
            mutates: false,
            payable: false,
            returnType: {
              displayName: [
                "psp22_external",
                "BalanceOfOutput"
              ],
              type: 0
            },
            selector: "0x6568382f"
          },
          {
            args: [
              {
                label: "owner",
                type: {
                  displayName: [
                    "psp22_external",
                    "AllowanceInput1"
                  ],
                  type: 2
                }
              },
              {
                label: "spender",
                type: {
                  displayName: [
                    "psp22_external",
                    "AllowanceInput2"
                  ],
                  type: 2
                }
              }
            ],
            docs: [],
            label: "PSP22::allowance",
            mutates: false,
            payable: false,
            returnType: {
              displayName: [
                "psp22_external",
                "AllowanceOutput"
              ],
              type: 0
            },
            selector: "0x4d47d921"
          }
        ]
      },
      storage: {
        struct: {
          fields: [
            {
              layout: {
                struct: {
                  fields: [
                    {
                      layout: {
                        cell: {
                          key: "0x56d8879b05a90b526146e14a5a336f2bf7780a87cf24a56cb99e23848733ecb5",
                          ty: 0
                        }
                      },
                      name: "supply"
                    },
                    {
                      layout: {
                        cell: {
                          key: "0x57d8879b05a90b526146e14a5a336f2bf7780a87cf24a56cb99e23848733ecb5",
                          ty: 1
                        }
                      },
                      name: "balances"
                    },
                    {
                      layout: {
                        cell: {
                          key: "0x58d8879b05a90b526146e14a5a336f2bf7780a87cf24a56cb99e23848733ecb5",
                          ty: 6
                        }
                      },
                      name: "allowances"
                    },
                    {
                      layout: {
                        enum: {
                          dispatchKey: "0x59d8879b05a90b526146e14a5a336f2bf7780a87cf24a56cb99e23848733ecb5",
                          variants: {
                            0: {
                              fields: [
                                {
                                  layout: {
                                    cell: {
                                      key: "0x5ad8879b05a90b526146e14a5a336f2bf7780a87cf24a56cb99e23848733ecb5",
                                      ty: 8
                                    }
                                  },
                                  name: null
                                }
                              ]
                            },
                            1: {
                              fields: []
                            }
                          }
                        }
                      },
                      name: "_reserved"
                    }
                  ]
                }
              },
              name: "psp22"
            },
            {
              layout: {
                cell: {
                  key: "0x0000000000000000000000000000000000000000000000000000000000000000",
                  ty: 2
                }
              },
              name: "hated_account"
            }
          ]
        }
      },
      types: [
        {
          id: 0,
          type: {
            def: {
              primitive: "u128"
            }
          }
        },
        {
          id: 1,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    name: "offset_key",
                    type: 5,
                    typeName: "Key"
                  }
                ]
              }
            },
            params: [
              {
                name: "K",
                type: 2
              },
              {
                name: "V",
                type: 0
              }
            ],
            path: [
              "ink_storage",
              "lazy",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          id: 2,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    type: 3,
                    typeName: "[u8; 32]"
                  }
                ]
              }
            },
            path: [
              "ink_env",
              "types",
              "AccountId"
            ]
          }
        },
        {
          id: 3,
          type: {
            def: {
              array: {
                len: 32,
                type: 4
              }
            }
          }
        },
        {
          id: 4,
          type: {
            def: {
              primitive: "u8"
            }
          }
        },
        {
          id: 5,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    type: 3,
                    typeName: "[u8; 32]"
                  }
                ]
              }
            },
            path: [
              "ink_primitives",
              "Key"
            ]
          }
        },
        {
          id: 6,
          type: {
            def: {
              composite: {
                fields: [
                  {
                    name: "offset_key",
                    type: 5,
                    typeName: "Key"
                  }
                ]
              }
            },
            params: [
              {
                name: "K",
                type: 7
              },
              {
                name: "V",
                type: 0
              }
            ],
            path: [
              "ink_storage",
              "lazy",
              "mapping",
              "Mapping"
            ]
          }
        },
        {
          id: 7,
          type: {
            def: {
              tuple: [
                2,
                2
              ]
            }
          }
        },
        {
          id: 8,
          type: {
            def: {
              tuple: []
            }
          }
        },
        {
          id: 9,
          type: {
            def: {
              sequence: {
                type: 4
              }
            }
          }
        },
        {
          id: 10,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 8
                      }
                    ],
                    index: 0,
                    name: "Ok"
                  },
                  {
                    fields: [
                      {
                        type: 11
                      }
                    ],
                    index: 1,
                    name: "Err"
                  }
                ]
              }
            },
            params: [
              {
                name: "T",
                type: 8
              },
              {
                name: "E",
                type: 11
              }
            ],
            path: [
              "Result"
            ]
          }
        },
        {
          id: 11,
          type: {
            def: {
              variant: {
                variants: [
                  {
                    fields: [
                      {
                        type: 12,
                        typeName: "String"
                      }
                    ],
                    index: 0,
                    name: "Custom"
                  },
                  {
                    index: 1,
                    name: "InsufficientBalance"
                  },
                  {
                    index: 2,
                    name: "InsufficientAllowance"
                  },
                  {
                    index: 3,
                    name: "ZeroRecipientAddress"
                  },
                  {
                    index: 4,
                    name: "ZeroSenderAddress"
                  },
                  {
                    fields: [
                      {
                        type: 12,
                        typeName: "String"
                      }
                    ],
                    index: 5,
                    name: "SafeTransferCheckFailed"
                  }
                ]
              }
            },
            path: [
              "contracts",
              "traits",
              "errors",
              "psp22",
              "PSP22Error"
            ]
          }
        },
        {
          id: 12,
          type: {
            def: {
              primitive: "str"
            }
          }
        }
      ]
    }
  }